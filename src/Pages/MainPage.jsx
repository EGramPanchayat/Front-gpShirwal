import React, { useEffect, useState } from "react";
import ExecutiveBoard from "../Components/ExecutiveBoard";
import Navbar from "../Components/Navbar";
import NewsSection from "../Components/NewsSection";
import axioesInstance from "../utils/axioesInstance";
import DevelopmentSlideshow from "../Components/DevelopmentSection";

import PlacesSection from "../Components/PlacesSection";
import ContactSection from "../Components/ContactSection";
import FooterSection from "../Components/FooterSection";
import CertificatesSection from "../Components/CertificatesSection";
import DakhalaMagani from "../Components/DakhalaMagani";
import ServicesSection from "../Components/ServicesSection";
import TaxSection from "../Components/TaxSection";

// Executive members data for cards
const executiveMembers = [
  
  { name: "श्री. विकास कचरू शेटे", phone: "+91 9876543210", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "श्री. रमेश कुंडलिक पुंडे", phone: "+91 9123456789", img: "https://randomuser.me/api/portraits/men/46.jpg" },
  { name: "श्री. खंडू भोमा मेंगाळ", phone: "+91 9988776655", img: "https://randomuser.me/api/portraits/men/47.jpg" },
  { name: "श्रीमती. बेबीताई दत्तात्रय शेटे", phone: "+91 9876123456", img: "https://randomuser.me/api/portraits/women/48.jpg" },
  { name: "श्रीमती. शैला मंगेश शेटे", phone: "+91 9123459876", img: "https://randomuser.me/api/portraits/women/49.jpg" },
  { name: "श्रीमती. उज्वला साहेबराव घुले", phone: "+91 9988123456", img: "https://randomuser.me/api/portraits/women/50.jpg" },
  { name: "श्रीमती. नानीबाई साहेबराव मेंगाळ", phone: "+91 9876543219", img: "https://randomuser.me/api/portraits/women/51.jpg" },
];
// src/Users/MainPage/MainPage.jsx
// import React from "react"; // removed duplicate import

const stats = [
  { icon: "🌾", number: "1340", label: "हेक्टर क्षेत्रफळ" },
  { icon: "🏘", number: "4", label: "वार्ड संख्या" },
  { icon: "👥", number: "3811", label: "एकूण लोकसंख्या" },
  { icon: "🏠", number: "804", label: "कुटुंब संख्या" },
];




// Development slideshow moved to `front/src/Components/DevelopmentSection.jsx`





const sectionIds = [
  "home",
  "about",
  "development",
  "services",
  "certificates",
  "tax",
  "members",
  "officials",
  "places",
  "contact",
];

const MainPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  // Mobile nav state
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showQRModal, setShowQRModal] = useState("");
  const [panipattiQR, setPanipattiQR] = useState(null);
  const [gharPattiQR, setGharPattiQR] = useState(null);

  // Custom hook to fetch development works from backend
  useEffect(() => {
    axioesInstance.get("/qr").then((response) => {
      const data = response.data;
      setPanipattiQR(data.panipattiQR?.url);
      setGharPattiQR(data.gharPattiQR?.url);

    })
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionMid = rect.top + rect.height / 2;
          if (sectionMid > 80 && sectionMid < window.innerHeight) {
            setActiveSection(sectionIds[i]);
            found = true;
            break;
          }
        }
      }
      if (!found) setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 font-sans ">
        {/* Navbar */}
        <Navbar activeSection={activeSection} mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />

      {/* ✅ Hero Section – height equals actual image height */}

      <section id="home" className="relative w-full flex justify-center items-center">
        <div className="relative w-full ">
          <img
            src="/images/village.png"
            alt="गाव दृश्य"
            className="w-full object-cover h-64 sm:h-80 md:h-full"
          />
  <div className="absolute inset-0 flex flex-col items-center justify-top text-center px-4 py-8 md:py-20">
      <h1 className="text-3xl md:text-[2.5rem] font-extrabold drop-shadow md:mb-5 text-green-700">
            ग्रामपंचायत शिरवळ मध्ये स्वागत आहे
          </h1>
          <p className="text-xl md:text-3xl mb-6 font-bold text-green-700">ता.अक्कलकोट  जि.सोलापूर </p>
        </div>
      </div>
    </section>

    <div className="bottom-village-content flex flex-col items-center w-full px-1 md:px-0 lg:px-15">
      {/* Stats Cards */}
  <div className="flex flex-wrap justify-center px-2 gap-4 sm:gap-8 mt-8 mb-8 w-full">
        {stats.map((stat, idx) => (
          <div
              key={idx}
              className={
                `bg-white rounded-xl shadow-lg px-10 py-6 flex flex-col items-center 
                border-l-4 border-green-400 hover:-translate-y-1 hover:shadow-xl transition
                aspect-[5/2] min-w-[200px] w-full md:w-[300px] sm:max-w-xs
                animate-[fadeUpSmall_0.7s_ease-out]`
              }
              style={{animationDelay: `${0.1 + idx * 0.1}s`}}>
            <div>
               <div className="text-4xl mb-2 flex justify-center ">{stat.icon}</div>
              <div className="text-2xl font-bold text-green-700 mb-1 flex justify-center">{stat.number}</div>
              <div className="text-gray-600 text-base flex justify-center">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

         {/* About Section */}
      <section id="about" className="px-5 md:px-0 py-10 w-full md:max-w-[81rem] flex flex-col items-center justify-center text-center">
        <div className="max-w-8xl w-full flex flex-col items-center">
         
          <div className="bg-white  rounded-xl shadow-lg p-4 sm:p-8 mb-4 sm:mb-8 hover:shadow-2xl hover:-translate-y-1 transition">

             <h2 className="text-3xl md:text-[2.5rem] font-bold text-green-700 text-center mb-20 mt-5 relative">
            गावाची माहिती
            <span className="block w-24 h-1 bg-orange-400 rounded absolute left-1/2 -translate-x-1/2 -bottom-3"></span>
          </h2>
          

            <p className="text-lg text-justify leading-relaxed mt-4">
            <span className="text-orange-500 font-semibold">शिरवळ</span> हे 
            <span className="text-orange-500 font-semibold"> महाराष्ट्र राज्यातील सोलापूर जिल्ह्यातील अक्कलकोट तालुक्यातील </span> 
            एक प्रगतशील आणि ऐतिहासिक गाव आहे. हे गाव महाराष्ट्र-कर्नाटक हायवेवर वसलेले असून 
            श्री स्वामी समर्थ महाराज देवस्थान, अक्कलकोट पासून केवळ 
            <span className="text-orange-500 font-semibold"> 12 किलोमीटर </span> अंतरावर आहे.
          </p>

          <p className="text-lg text-justify leading-relaxed mt-4">
            येथे <span className="text-orange-500 font-semibold">ग्रामपंचायत</span> ही गावातील स्थानिक स्वराज्य संस्थेची मूलभूत पातळी असून ती 
            ग्रामविकास, स्वच्छता, पाणीपुरवठा, शिक्षण, आरोग्य, रस्ते बांधकाम, आणि विविध शासकीय योजना राबविण्याचे कार्य करते. 
            या गावाला <span className="text-orange-500 font-semibold">सुंदर गाव पुरस्कार</span> देखील प्राप्त झाला आहे. 
            गावाची प्रमुख <span className="text-orange-500 font-semibold">अर्थव्यवस्था</span> शेती, पशुपालन आणि लघुउद्योगावर आधारित आहे.
          </p>

          <p className="text-lg text-justify leading-relaxed mt-4">
            गावामध्ये <span className="text-orange-500 font-semibold">श्री पंचलिंगेश्वर</span> हे प्रसिद्ध ग्राम देवस्थान आहे. 
            येथे वार्षिक जत्रा आणि उत्सव कार्यक्रम मोठ्या उत्साहात साजरे केले जातात. 
            गावातील सांस्कृतिक परंपरा आजही जपली जात असून समाजात एकोपा आणि ऐक्य टिकवून ठेवले आहे.
          </p>

          <p className="text-lg text-justify leading-relaxed mt-4">
            गावात <span className="text-orange-500 font-semibold">जिल्हा परिषद प्राथमिक शाळा 4</span>, 
            <span className="text-orange-500 font-semibold"> अंगणवाडी केंद्रे 5</span>, 
            <span className="text-orange-500 font-semibold"> माध्यमिक विद्यालय 1</span>, 
            <span className="text-orange-500 font-semibold"> वाचनालय 1</span> आणि 
            <span className="text-orange-500 font-semibold"> व्यायामशाळा 1</span> अशा शैक्षणिक व शारीरिक सुविधा उपलब्ध आहेत. 
            विविध सामाजिक संघटना गावाच्या विकासात सक्रियपणे कार्यरत आहेत.
          </p>

          <p className="text-lg text-justify leading-relaxed mt-4">
            गावातील बहुतांश लोकांचा मुख्य व्यवसाय <span className="text-orange-500 font-semibold">शेती</span> असून 
            ज्वारी, गहू, तूर आणि ऊस ही प्रमुख पिके घेतली जातात. 
            ऊस पिकामुळे गावातील शेतकऱ्यांना चांगले उत्पन्न मिळते. 
            ग्रामविकासासाठी लोकसहभागावर आधारित अनेक प्रकल्प यशस्वीपणे राबविले जातात.
          </p>

          <p className="text-lg text-justify leading-relaxed mt-4">
            शिरवळ ग्रामपंचायतीत विविध शासकीय योजना प्रभावीपणे राबविल्या गेल्या आहेत. 
            <span className="text-orange-500 font-semibold">स्वच्छ भारत अभियान</span> अंतर्गत शिरवळ गावाने 
            संपूर्ण <span className="text-orange-500 font-semibold">खुले शौचमुक्त (ODF+)</span> दर्जा मिळवला आहे.
          </p>


          

          </div>
        </div>
      </section>


      </div>


    
<NewsSection />

    <section id="development" className="pt-0 md:py-10 w-full flex flex-col items-center bg-gray-50 ">
  <div className="max-w-6xl w-full mx-auto px-2 sm:px-0">
        <h2 className="text-3xl md:text-[2.5rem] font-bold text-green-700 text-center my-15 relative">विकास कामे
          <span className="block w-24 h-1 bg-orange-400 rounded absolute left-1/2 -translate-x-1/2 -bottom-3"></span>
        </h2>
        <DevelopmentSlideshow />
      </div>
    </section>




    

    {/* Services Section */}

<ServicesSection  />

  <CertificatesSection />
  <DakhalaMagani />







    {/* Tax Section as Component */}
    <TaxSection setShowQRModal={setShowQRModal} panipattiQR={panipattiQR} gharPattiQR={gharPattiQR} />






      {/* कार्यकारी मंडळ Section  k*/}
      <ExecutiveBoard />

            {/* Places Section */}
      <PlacesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer Section */}

<FooterSection />


  
    
  </div>
  );
}

export default MainPage;

