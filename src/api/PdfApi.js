import { Http } from './Api'
import FirebaseApi from './config/firebase'
import localforage from "localforage";

export default class PdfApi {
    serverAlive = Http.get(`isAlive`).then(res => { return res.data === 200 })

    static refreshPdfWithServer = () => {
        this.getPdfFromServer().then(pdf => {
            localforage.setItem('pdf', pdf);
        })
    }
    static getPdfFromServer = () => {
        if (!this.serverAlive) {
            return FirebaseApi.getPdf()
        } else {
            return Http.get(`getPdf`)
        }
    }
    static getPdf = async () => {
        let pdf = await localforage.getItem('pdf')
        if (pdf) {
            return pdf
        }
        let res = this.getPdfFromServer()
        res.then(pdf => {

            localforage.setItem('pdf', pdf);
        })
        return res
    }
    static newPdf = () => {
        let res
        if (!this.serverAlive) {
            res = FirebaseApi.newPdf()
        } else {
            res = Http.get(`newPdf`)
        }
        res.then(pdf => {
            localforage.setItem('pdf', pdf);
        })
        return res
    }

    static updatePdf = async (upDate) => {
        let pdf = await localforage.getItem('pdf')
        if (pdf) {
            let language = upDate.language
            pdf.language = language
            if (language in upDate) {
                pdf[language] = upDate[language]
            }
            localforage.setItem('pdf', pdf);
        }
        let res
        if (!this.serverAlive) {
            res = FirebaseApi.updatePdf(upDate)
        } else {
            res = Http.put(`updatePdf/`, upDate)
        }
        return res
    }

    static uplodadPdf = (uploadedImage, noServerUploade = false) => {
        let res
        if (!this.serverAlive || noServerUploade) {
            res = FirebaseApi.uplodadPdf(uploadedImage)
        } else {
            res = this.uplodadPdf(uploadedImage, noServerUploade = true)
        }
        return res
    }
}