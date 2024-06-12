import ChartSettings from "./chart-settings";

export default function RightPanel() {
  return (
    <>
      <h2 className="text-4xl font-bold text-foreground">Chart Settings</h2>
      <div className="grow rounded-lg border border-border bg-card shadow-sm">
        <div className="grid grid-cols-1">
          <ChartSettings />
          <div className="col-span-1 p-4 text-white">
            <h3 className="text-xl font-bold text-foreground">
              Project Contributers
            </h3>
            <div className="grid grid-cols-1 gap-2 p-2 *:font-semibold *:text-center *:text-lg">
              <p>Taha Berk Yahşi</p>
              <p>Emre Can Çorapçı</p>
              <p>Yunus Emre Kunduz</p>
              <p>Cihan Aktürk</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
