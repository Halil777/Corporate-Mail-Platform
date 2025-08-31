"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "ru" | "tr"

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    inbox: "Входящие",
    starred: "Избранное",
    sent: "Отправленные",
    archive: "Архив",
    trash: "Корзина",
    calendar: "Календарь",
    files: "Файлы",
    tasks: "Задачи",
    contacts: "Контакты",
    search: "Поиск",
    admin: "Админ",
    modules: "Модули",
    settings: "Настройки",
    "search-mail": "Поиск по почте...",
    "profile-settings": "Настройки профиля",
    "sign-out": "Выйти",
    "search-contacts": "Поиск контактов...",
    "add-contact": "Добавить контакт",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    company: "Компания",
    "full-name": "Полное имя",
    "email-placeholder": "name@example.com",
    "phone-placeholder": "(555) 555-5555",
    "company-placeholder": "Название компании",
    "no-contacts": "Контакты не найдены",
    cancel: "Отмена",
    "save-contact": "Сохранить контакт",
  },
  tr: {
    inbox: "Gelen Kutusu",
    starred: "Yıldızlı",
    sent: "Gönderilmiş",
    archive: "Arşiv",
    trash: "Çöp Kutusu",
    calendar: "Takvim",
    files: "Dosyalar",
    tasks: "Görevler",
    contacts: "Kişiler",
    search: "Arama",
    admin: "Yönetici",
    modules: "Modüller",
    settings: "Ayarlar",
    "search-mail": "Posta ara...",
    "profile-settings": "Profil Ayarları",
    "sign-out": "Çıkış Yap",
    "search-contacts": "Kişileri ara...",
    "add-contact": "Kişi Ekle",
    name: "İsim",
    email: "E-posta",
    phone: "Telefon",
    company: "Şirket",
    "full-name": "Tam isim",
    "email-placeholder": "isim@ornek.com",
    "phone-placeholder": "(555) 555-5555",
    "company-placeholder": "Şirket adı",
    "no-contacts": "Kişi bulunamadı",
    cancel: "İptal",
    "save-contact": "Kişiyi Kaydet",
  },
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "ru",
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = (key: string) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

