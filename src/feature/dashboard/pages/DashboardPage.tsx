import IconSVG from '@shared/components/IconSVG';
import MiniCard from '@feature/dashboard/components/MiniCard';
import CustomPieChart from '@feature/dashboard/components/CustomPieChart';
import CustomBarChart from '@feature/dashboard/components/CustomBarChart';
import CustomAreaChart from '@feature/dashboard/components/CustomAreaChart';

export default function DashboardPage() {
  return (
    <section>
      <div className="row">
        <div className="col-md-4">
          <MiniCard title="Clientes" icon={<IconSVG width="32" height="32" />} data="7" />
        </div>

        <div className="col-md-4">
          <MiniCard title="Empleados" icon={<IconSVG width="32" height="32" />} data="5" />
        </div>

        <div className="col-md-4">
          <MiniCard title="Prestamos" icon={<IconSVG width="32" height="32" />} data="10" />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5">
          <CustomAreaChart />
        </div>

        <div className="col-md-4">
          <CustomBarChart />
        </div>

        <div className="col-md-3">
          <CustomPieChart />
        </div>
      </div>
    </section>
  );
}
