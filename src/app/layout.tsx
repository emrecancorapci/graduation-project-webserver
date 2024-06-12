import Header from "@/components/header";
import RightPanel from "@/components/right-panel";
import "@/styles/globals.css";

export const metadata = {
  title: "Li-Fi İletişimli Akıllı Sera Sistemi",
  description: "Li-Fi üzerinden iletişim gerçekleştiren akıllı sera sistemi projesinin arayüzü",   
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="dark flex h-screen w-screen flex-col bg-black">
        <div className="flex h-screen w-screen flex-col items-center antialiased">
          <Header />
          <div className="w-full grow px-4">
            <div className="grid h-full grid-cols-5 gap-4 px-4 py-8">
              <div className="col-span-5 h-full lg:col-span-4">{children}</div>
              <div className="col-span-5 flex flex-col gap-4 lg:col-span-1">
                <RightPanel />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
