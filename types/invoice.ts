export interface Kelas {
  id: number
  tanggal: string
  jam: string
  namaPengajar: string
}

export interface Invoice {
  id: string
  isSudahBayar: boolean
  namaJenis: string
  creatdAt: Date
  idKelas: number
  kelas: Kelas
}

export interface InvoiceList {
  _embedded: {
    invoiceModelList: Invoice[]
  }
}
