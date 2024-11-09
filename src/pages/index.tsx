/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react"

import useCVStore from "@/store/cv"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"

import CvTemplate from "@/components/cv-template"

export default function Home() {
  const cv = useCVStore((state) => state)
  

  useEffect(() => {
    

    function handleBeforePrint() {
      document.getElementById("sidebar")?.classList.add("hidden")
      document.getElementById("cv-section")?.classList.add("col-span-12")
      document
        .getElementById("cv-section")
        ?.classList.remove("col-span-8", "col-start-5")
      document.getElementById("btn-group")?.classList.add("hidden")
      document.title = `${cv.firstName || "Your"}_${
        cv.lastName || "Name"
      }_CV_${new Date().getFullYear()}`
    }

    function handleAfterPrint() {
      document.getElementById("sidebar")?.classList.remove("hidden")
      document.getElementById("cv-section")?.classList.remove("col-span-12")
      document
        .getElementById("cv-section")
        ?.classList.add("col-span-8", "col-start-5")
      document.getElementById("btn-group")?.classList.remove("hidden")
      document.title = "CV"
    }

    window.addEventListener("beforeprint", handleBeforePrint)
    window.addEventListener("afterprint", handleAfterPrint)

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint)
      window.removeEventListener("afterprint", handleAfterPrint)
    }
  }, [cv.firstName, cv.lastName])

  function handleDownload() {
    window.print()
  }

  function setApiKeyCookie(apiKey: string) {
    const expiry = new Date()
    expiry.setTime(expiry.getTime() + 30 * 60 * 1000) // 30 minutes from now
    const cookieValue = `apiKey=${encodeURIComponent(
      apiKey
    )};expires=${expiry.toUTCString()};path=/;SameSite=Strict`
    document.cookie = cookieValue
  }

  function getApiKeyCookie() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("apiKey"))
    if (cookieValue) {
      return cookieValue.split("=")[1]
    }
    return ""
  }

  return (
    <section
      className="col-span-8 col-start-5 max-w-4xl mx-auto py-20"
      id="cv-section"
    >
      <CvTemplate />
      <div
        className="fixed right-4 bottom-8 flex flex-col items-center gap-4"
        id="btn-group"
      >
       
        <Button className=" rounded-full p-8">
          <Download onClick={handleDownload} className="size-6" />
        </Button>
      </div>
    </section>
  )
}
