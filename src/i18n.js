import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Home: "Home",
      Menu: "Menu",
      yourOrderProcessStage: "Your order process stage.",
      YourOrderisConfirmed: "Your order is Confirmed.",
      Offers: "Offers",
      Search: "Search",
      OurMenu: "Our Menu",
      viewAll: "View All",
      add: "Add",
      featuredItems: "Featured Items",
      mostPopularItmes: "Most Popular Items",
      usefulLinks: "Useful Links",
      yourEmail: "Your email address",
      subscribeToOurNewslatter:
        "Subscribe to our newsletter to get latest updates",
      subscribe: "Subscribe",
    },
  },
  ar: {
    translation: {
      Home: "الصفحة الرئيسية",
      Menu: "القائمة",
      yourOrderProcessStage: "مرحلة معالجة طلبك.",
      YourOrderisConfirmed: "تم تأكيد طلبك.",
      Offers: "العروض",
      Search: "يبحث",
      OurMenu: "قائمتنا",
      viewAll: "عرض الكل",
      add: "إضافة",
      featuredItems: "العناصر المميزة",
      mostPopularItmes: "العناصر الأكثر شيوعًا",
      usefulLinks: "روابط مفيدة",
      yourEmail: "عنوان بريدك الإلكتروني",
      subscribeToOurNewslatter:
        "اشترك في النشرة الإخبارية للحصول على آخر التحديثات",
      subscribe: "الاشتراك",
    },
  },
  fr: {
    translation: {
      Home: "Home",
      Menu: "Menu",
      yourOrderProcessStage: "Your order process stage.",
      YourOrderisConfirmed: "Your order is Confirmed.",
      Offers: "Offers",
      Search: "Search",
      OurMenu: "Our Menu",
      viewAll: "View All",
      add: "Add",
      featuredItems: "Featured Items",
      mostPopularItmes: "Most Popular Items",
      usefulLinks: "Useful Links",
      yourEmail: "Your email address",
      subscribeToOurNewslatter:
        "Subscribe to our newsletter to get latest updates",
      subscribe: "Subscribe",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
