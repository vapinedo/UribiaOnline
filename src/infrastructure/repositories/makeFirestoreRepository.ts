import { v4 as createUuid } from 'uuid';
import firebaseConfig from '@infrastructure/firebase/firebaseConfig';
import type { WithFieldValue, DocumentData } from 'firebase/firestore';
import { toastSuccess, toastError } from '@infrastructure/notifications/notificationAdapter';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { doc, getDocs, getDoc, setDoc, collection, runTransaction, deleteDoc } from 'firebase/firestore';

const { db, storage } = firebaseConfig;

type WithImages<T> = T & { imagenURLs?: string[] };

export default function makeFirestoreRepository<T extends WithFieldValue<DocumentData>>(COLLECTION: string) {
  const getAllDocuments = async (): Promise<T[]> => {
    const documents: T[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION));
      for (const docSnapshot of querySnapshot.docs) {
        const documentData = { id: docSnapshot.id, ...docSnapshot.data() } as unknown as T;
        documents.push(documentData);
      }
    } catch (error) {
      toastError(error, `Error al obtener los documentos de ${COLLECTION}`);
    }
    return documents;
  };

  const getDocumentById = async (id: string): Promise<T | null> => {
    let document: T | null = null;
    try {
      const docRef = doc(db, COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        document = { id, ...docSnap.data() } as unknown as T;
      }
    } catch (error) {
      toastError(error, `Error al obtener documento por ID ${id} de ${COLLECTION}`);
    }
    return document;
  };

  const createDocument = async (document: T & { id?: string }, imageFiles?: FileList | null) => {
    try {
      if (!document.id) {
        document.id = createUuid();
      }

      let finalDoc: T | WithImages<T> = document;

      if (imageFiles) {
        const imageUrls = await uploadImagesForDocument(document.id, imageFiles);
        finalDoc = {
          ...document,
          imagenURLs: imageUrls,
        };
      }

      await setDoc(doc(db, COLLECTION, document.id), finalDoc);
      toastSuccess('Documento creado exitosamente!');
    } catch (error) {
      toastError(error, `Error al crear documento en ${COLLECTION}`);
    }
  };

  const updateDocument = async (document: T & { id: string }, imageFiles?: FileList | null) => {
    const docRef = doc(db, COLLECTION, document.id);
    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(docRef);
        if (!sfDoc.exists()) {
          throw new Error(`No existe el documento que quiere editar en ${COLLECTION}`);
        }

        let finalDoc: T | WithImages<T> = document;

        if (imageFiles) {
          await deleteImagesForDocument(document.id);
          const imageUrls = await uploadImagesForDocument(document.id, imageFiles);

          finalDoc = {
            ...document,
            imagenURLs: imageUrls,
          };
        }

        transaction.update(docRef, finalDoc);
      });

      toastSuccess('Documento actualizado exitosamente!');
    } catch (error) {
      toastError(error, `Error al actualizar documento en ${COLLECTION}`);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await deleteImagesForDocument(id);
      const docRef = doc(db, COLLECTION, id);
      await deleteDoc(docRef);
      toastSuccess('Documento eliminado exitosamente!');
    } catch (error) {
      toastError(error, `Error al eliminar documento en ${COLLECTION}`);
    }
  };

  const uploadImagesForDocument = async (documentId: string, imageFiles: FileList): Promise<string[]> => {
    const imageUrls: string[] = [];

    const uploadPromises = Array.from(imageFiles).map(async (file) => {
      const storageRef = ref(storage, `${COLLECTION}/${documentId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    });

    await Promise.all(uploadPromises);
    return imageUrls;
  };

  const deleteImagesForDocument = async (documentId: string) => {
    try {
      const imagesRef = ref(storage, `${COLLECTION}/${documentId}`);
      const imageList = await listAll(imagesRef);
      await Promise.all(imageList.items.map((imageRef) => deleteObject(imageRef)));
    } catch (error) {
      console.error('Error al eliminar imágenes del documento:', error);
    }
  };

  const getTotalRecords = async (): Promise<number> => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION));
      return querySnapshot.size;
    } catch (error) {
      toastError(error, `Error al obtener el total de registros de ${COLLECTION}`);
      return 0;
    }
  };

  return {
    listar: getAllDocuments,
    obtenerPorId: getDocumentById,
    crear: createDocument,
    actualizar: updateDocument,
    eliminar: deleteDocument,
    contar: getTotalRecords,
  };
}
