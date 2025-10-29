import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*", // السماح لكل محركات البحث
                allow: "/", // السماح بفهرسة كل الصفحات
                disallow: ["/api/", "/admin/"], // منع الزحف على الـ API أو لوحة التحكم
            },
        ],
        sitemap: "https://dev-events-nine.vercel.app/sitemap.xml", // رابط ملف sitemap
        host: "https://dev-events-nine.vercel.app",
    };
}
