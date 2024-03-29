import { simaduApiUrl, apiV2, apiV2URL } from '@api'
import { formatYYYYMMDD } from '@util'
import {
	downloadRentangTanggalValidator,
	downloadRentangTanggalRingkasanValidator
} from '@validator'
import {
	APIResponse,
	ServiceResponse,
	LaporanData,
	LaporanDataResponse,
	SuratTugasLaporanData,
	SuratTugasLaporanDataResponse,
	DeleteLaporanInput
} from '@interface'

export const downloadLaporanRentangTanggal = (
	startDate: Date,
	endDate: Date,
	organization: string
): ServiceResponse => {
	const validate = downloadRentangTanggalValidator(startDate, endDate)
	if (!validate.pass) {
		return {
			success: false,
			message: validate.message
		}
	}
	// console.log(organization)

	// Prepare Download URL
	if (organization) {
		const url = `${apiV2URL}/karhutla/downloadrange?start=${formatYYYYMMDD(
			startDate
		)}&end=${formatYYYYMMDD(endDate)}&org=${organization}`
		window.open(url)
	} else {
		const url = `${apiV2URL}/karhutla/downloadrange?start=${formatYYYYMMDD(
			startDate
		)}&end=${formatYYYYMMDD(endDate)}`
		window.open(url)
	}

	// // Open URL in new tab
	return {
		success: true,
		message: ''
	}
}

export const downloadLaporanRingkasan = (
	startDate: Date,
	endDate: Date,
	organization: string
): ServiceResponse => {
	const validate = downloadRentangTanggalRingkasanValidator(
		startDate,
		endDate
	)
	if (!validate.pass) {
		return {
			success: false,
			message: validate.message
		}
	}
	// console.log(organization)

	// Prepare Download URL
	if (organization) {
		const url = `${apiV2URL}/simadu/downloadRingkasan?start=${formatYYYYMMDD(
			startDate
		)}&end=${formatYYYYMMDD(endDate)}&org=${organization}`
		window.open(url)
	} else {
		const url = `${apiV2URL}/simadu/downloadRingkasan?start=${formatYYYYMMDD(
			startDate
		)}&end=${formatYYYYMMDD(endDate)}`
		window.open(url)
	}

	// // Open URL in new tab
	return {
		success: true,
		message: ''
	}
}

export const getLaporanDetail = async (
	laporanId: string
): Promise<{
	success: boolean
	message: string | string[]
	data?: any
	no_sk: any
}> => {
	const r: APIResponse<any> = await apiV2.get(`laporan/fetch/${laporanId}`)
	console.log(r)
	if (r.status === 200) {
		return { success: true, message: r.message, no_sk: r, data: r.data }
	}
	return { success: false, message: r.message, no_sk: null }
}

export const getDetailList = async (): Promise<{
	success: boolean
	message: string | string[]
	data?: any
}> => {
	const r: APIResponse<LaporanDataResponse[]> = await apiV2.get(`lists/all`)
	console.log(r)
	if (r.status === 200) {
		console.log(r.data)
		return { success: true, message: r.message, data: r.data }
	}
	return { success: false, message: r.message }
}

export const updateLaporan = async (data: any): Promise<ServiceResponse> => {
	if (data.satelit_hotspot.length === 0) {
		return { success: false, message: 'Satelit tidak boleh kosong' }
	}

	if (data.id_inventori_patroli.length === 0) {
		return { success: false, message: 'Inventory tidak boleh kosong' }
	}

	if (data.id_aktivitas_harian.length === 0) {
		return {
			success: false,
			message: 'Aktivitas harian tidak boleh kosong'
		}
	}

	if (data.laporanDarat[0].aksebilitas.length === 0) {
		return { success: false, message: 'Aksebilitas tidak boleh kosong' }
	}

	const r: APIResponse<null> = await apiV2.post('/laporan/save', data)
	console.log(r)
	if (r.status === 200)
		return { success: true, message: 'Ubah data Laporan berhasil' }
	return { success: false, message: data.message }
}

export const getSKLaporanDetail = async (
	noSK: string
): Promise<SuratTugasLaporanData[]> => {
	const r: APIResponse<SuratTugasLaporanDataResponse[]> = await apiV2.get(
		`/simadu/listlaporan?nomor_sk=${noSK}`
	)
	console.log(r)
	if (r.status === 200) {
		return r.data.map((laporanDetail) => {
			const tanggal = new Date(laporanDetail.tanggal_patroli)
			const part_awal = laporanDetail.tanggal_patroli.split('-')
			const bulan = tanggal.toLocaleString('default', { month: 'short' })

			const tanggal_patroli =
				part_awal[2] + ' ' + bulan + ' ' + part_awal[0]

			return {
				id_laporan_header: laporanDetail.id_laporan_header,
				tanggal_patroli: tanggal_patroli,
				nama_daerah_patroli: laporanDetail.nama_daerah_patroli,
				nama_daops: laporanDetail.nama_daops,
				nama_ketua: laporanDetail.nama_ketua
			}
		})
	}
	return []
}

export const deleteLaporan = async (
	data: DeleteLaporanInput
): Promise<ServiceResponse> => {
	try {
		// const r: APIResponse<null> = await SimaduAPI.get(`/deletesk?no_st=${data.number}`)
		const r: APIResponse<{
			message: string
		}> = await apiV2.get(`laporan/delete/${data.id_laporan_header}`)
		console.log(r)
		if (r.status === 200) return { success: true, message: r.data.message }
		return { success: false, message: r.data.message }
	} catch (error) {
		return { success: false, message: error }
	}
}
