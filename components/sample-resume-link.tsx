"use client"

import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export default function SampleResumeLink() {
  const downloadSampleResume = () => {
    const sampleResume = `John Smith
john.smith@example.com | (555) 123-4567 | San Francisco, CA

PROFESSIONAL EXPERIENCE
Senior Research Scientist, Quantum Computing Lab (2018-Present)
- Lead a team of 5 researchers on quantum algorithm development
- Published 3 papers in Nature Quantum Information
- Secured $1.5M in research grants for the laboratory
- Presented findings at 4 international conferences

Research Associate, Institute of Advanced Technology (2014-2018)
- Developed novel approaches to quantum error correction
- Collaborated with international research teams on joint publications
- Mentored 3 PhD students on their dissertation research
- Awarded the Institute's Innovation Prize in 2016

EDUCATION
Ph.D. in Quantum Physics, Stanford University (2010-2014)
M.S. in Physics, MIT (2008-2010)
B.S. in Physics, UC Berkeley (2004-2008)

PUBLICATIONS
"Quantum Error Correction in Noisy Environments" - Nature Quantum Information (2021)
"Novel Approaches to Quantum Gate Implementation" - Physical Review Letters (2019)
"Entanglement Preservation in Quantum Networks" - Quantum (2017)
"Theoretical Foundations of Quantum Computing" - Journal of Physics (2015)

AWARDS & HONORS
Outstanding Research Award, Quantum Computing Association (2022)
Innovation Prize, Institute of Advanced Technology (2016)
Best Dissertation Award, Stanford Physics Department (2014)

PATENTS
"Method for Quantum State Preservation in Distributed Systems" - Patent #12345 (2020)
"Quantum Error Correction Circuit Design" - Patent #67890 (2018)

PROFESSIONAL MEMBERSHIPS
American Physical Society (APS)
Institute of Electrical and Electronics Engineers (IEEE)
International Association for Quantum Information (IAQI)
`

    const blob = new Blob([sampleResume], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample_eb1_resume.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" size="sm" onClick={downloadSampleResume} className="flex items-center">
      <FileDown className="h-4 w-4 mr-1" />
      Download Sample Resume
    </Button>
  )
}
