import Image from 'next/image';

export const metadata = {
  title: 'About',
  description: 'CV Indoline Store About',
};

const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col pt-32 md:pt-0 md:flex-row justify-center lg:px-24 md:px-8 md:h-screen gap-2 w-full items-center pb-8">
        <div className="md:flex-1 relative w-44 h-44 md:h-60 md:w-60">
          <Image src={'/logoIs.jpg'} alt="logo img" fill className="object-contain  w-full h-full  -z-10" />
        </div>
        <div className=" flex w-[90%] md:w-2/4 flex-col text-center md:text-start items-center md:items-start gap-2 px-3">
          <h2 className="font-semibold text-3xl md:text-5xl">CV Indo-line Sentosa</h2>
          <p className=" text-xl ">adalah perusahaan yang bergerak dibidang General Supplier, Mekanikal Elektrikal, Intstrumentasi dan Weighing Scale etc,</p>
          <p className=" text-xl">Dengan didukung oleh tenaga profesional dan berpengalaman dibidangnya, kami akan memberikan pelayanan terbaik kepada customer di seluruh wilayah Indonesia.</p>
          <a href="#visi" className="py-2 px-4 bg-primary text-white rounded-full hover:bg-slate-700">
            Visi Misi
          </a>
        </div>
      </div>

      <div id="visi" className="flex flex-col py-7 text-center px-12 bg-gray-200 md:w-full md:px-28 md:py-12">
        <h3 className="text-2xl font-semibold text-center">Visi Misi</h3>
        <div className=" flex flex-col md:flex-row gap-4  md:gap-8 mt-4 ">
          <div className="flex-1 flex flex-col md:text-start">
            <h5 className="text-xl font-semibold mt-3">Visi</h5>
            <p>Menjadi perusahaan Suplier demi kesejahteraan perusahaan dan karyawan, menjalankan bisnis secara beretika, bermartabat dan berkedulian aspek sosial lingkungan.</p>
          </div>
          <div className="flex-1 md:text-start">
            <div className="flex-1 flex flex-col ">
              <h5 className="text-xl font-semibold mt-3">Misi</h5>
              <ul className="flex flex-col gap-2 list-decimal">
                <li>Mengutamakan Kualitas produk yang terbaik untuk customer</li>
                <li>Menyediakan Timbangan Digital Etc. yang berkualitas dan terlengkap</li>
                <li>Memberikan pelayanan yang berkualitas dan tepat waktu dengan berorentiasi kepada kepuasan pelanggan</li>
                <li>Membangun sumber daya manusia yang berkompeten, profesional dan berdedikasi tinggi, sehingga dapat berperan dalam pengembangan perusahaan</li>
                <li>Menjalin Hubungan kerjasama yang baik dengan para konsumen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
