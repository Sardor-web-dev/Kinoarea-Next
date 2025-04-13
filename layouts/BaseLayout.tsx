import Footer from "@/components/custom/footer";
import Header from "@/components/custom/Header";

const BaseLayout = ({ child }: { child: any }) => {
  return (
    <>
      <div className="bg-[#1e2538] ">
        <Header title={"Наиболее популярные"} />
        <div
          className="flex flex-col items-center gap-10 w-full bg-no-repeat bg-center bg-[#1e2538]"
          style={{
            backgroundImage: "url(/main-bg.png)",
          }}
        >
          {child}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BaseLayout;
