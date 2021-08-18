import { PatroliResponse } from './api'

export interface UserData {
	id: number
	accessId: number
	name: string
	email: string
	registrationNumber: string
	phoneNumber: string
	organization: string
	photo: string | null
	role: number
	roleLevel: number
	roleName: string
}

export interface PenugasanData {
	id: string
}

export interface NonPatroliUserData {
	id: number
	accessId: number
	name: string
	email: string
	registrationNumber: string
	role: number
	organization: string
}

export interface BalaiData {
	id: string
	code: string
	name: string
	region: string
}

export interface DaopsData {
	id: string
	code: string
	name: string
	balaiId: string
}

export interface RegionData {
	id: string
	code: string
	name: string
	type: string
}

export interface PatrolData {
	latitude: string
	longitude: string
	marker: string
	patroli: PatroliResponse | null
}

export interface PatrolListData {
	reportLink: string
	patrolRegion: string
	operationRegion: string
	patrolDate: string
}

export interface SuratTugasData {
	id: string
	number: string
	type: string
	startDate: string
	finishDate: string
	reportLink: string
}

export interface SuratTugasTeamMemberData {
	id: string
	name: string
	registrationNumber: string
	organization: string
	startDate: string
	endDate: string
	posko: string
	daops: string
}

export interface PoskoData {
	id: string
	name: string
	daops: string
	daopsId: string
	kecamatan: string
	kecamatanId: string
}

export interface RoleData {
	id: number
	name: string
	level: number
	active: string
}
