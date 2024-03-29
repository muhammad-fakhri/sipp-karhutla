import styles from '@asset/jss/nextjs-material-kit/pages/wilayah-kerja.page.style'
import SiteLayout from '@component/Layout/SiteLayout'
import Loader from '@component/Loader/Loader'
import NavBtnGroup from '@component/NavBtnGroup'
import useAuth, { ProtectRoute } from '@context/auth'
import { BalaiData } from '@interface'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import {
	addBalai,
	deleteBalai,
	getAllBalai,
	getAllPulau,
	updateBalai
} from '@service'
import classNames from 'classnames'
import MaterialTable, { Column } from 'material-table'
import { useEffect, useState } from 'react'

type RegionType = {
	[name: string]: string
}

const generateWilayahLookup = async () => {
	const data: RegionType = {}
	const wilayah = await getAllPulau()
	wilayah.forEach((item) => {
		data[item.id] = `${item.type} ${item.name}`
	})
	return data
}

// TODO: Show organization at balai/pusat useraccess

function BalaiPage() {
	const { isAuthenticated, user } = useAuth()
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	const [show, setShow] = useState(false)
	const [column, setColumn] = useState<Column<BalaiData>[]>([])
	const [loading, setLoading] = useState(true)
	const [delete_condition, setdelete] = useState(false)
	const delete_role = [0, 1, 2]
	const [values, setValues] = useState<{
		balai: BalaiData[]
		alertMessage: string
		successAlert: boolean
	}>({
		balai: [],
		alertMessage: '',
		successAlert: true
	})
	const closeAlert = () => setShow(false)
	const showAlert = () => {
		setShow(true)
		setTimeout(() => {
			setShow(false)
		}, 3000)
	}
	useEffect(() => {
		const fetchData = async () => {
			const wilayahLookup = await generateWilayahLookup()
			const column = [
				{ title: 'Nama Balai', field: 'name' },
				{ title: 'Kode Balai', field: 'code' },
				{
					title: 'Wilayah',
					field: 'region',
					lookup: wilayahLookup
				}
			]
			setColumn(column)
			if (delete_role.includes(user.roleLevel)) {
				setdelete(true)
			}

			const data = await getAllBalai()
			setValues({ ...values, balai: data })
			setLoading(false)
		}
		if (isAuthenticated) fetchData()
	}, [isAuthenticated])

	return !isAuthenticated ? (
		<Loader />
	) : (
		<SiteLayout headerColor="info">
			<div
				className={classNames(
					classes.main,
					classes.mainRaised,
					classes.textCenter
				)}
			>
				<h2>Data Balai</h2>
				{show ? (
					<Alert
						severity={values.successAlert ? 'success' : 'error'}
						onClose={closeAlert}
						className={classes.alert}
					>
						{values.alertMessage}
					</Alert>
				) : null}
				<NavBtnGroup page="balai" />
				{loading ? (
					<CircularProgress />
				) : (
					<MaterialTable
						title=""
						columns={column}
						components={{
							Container: (props) => (
								<Paper {...props} elevation={0} />
							)
						}}
						data={values.balai}
						options={{
							search: true,
							actionsColumnIndex: -1,
							addRowPosition: 'first'
						}}
						localization={{
							body: {
								editRow: {
									deleteText: 'Yakin hapus data ini ?'
								}
							},
							header: { actions: 'Aksi' },
							pagination: {
								labelRowsSelect: 'Baris',
								labelDisplayedRows: '{from}-{to} dari {count}'
							},
							toolbar: {
								searchPlaceholder: 'Pencarian'
							}
						}}
						editable={{
							isDeletable: (rowData) => delete_condition,
							isEditable: (rowData) => delete_condition,
							onRowAdd: (newData) =>
								new Promise<void>((resolve, reject) => {
									addBalai(newData).then(async (result) => {
										if (result.success) {
											const data = await getAllBalai()
											setValues({
												...values,
												balai: data,
												alertMessage:
													'Tambah Balai Berhasil',
												successAlert: true
											})
											resolve()
										} else {
											setValues({
												...values,
												alertMessage: `Tambah Balai Gagal, ${result.message}`,
												successAlert: false
											})
											reject()
										}
										showAlert()
									})
								}),
							onRowUpdate: (newData, oldData) =>
								new Promise<void>((resolve, reject) => {
									if (oldData) {
										updateBalai(newData, oldData).then(
											(result) => {
												if (result.success) {
													const dataUpdate = [
														...values.balai
													]
													const oldRowData: any = oldData
													const index =
														oldRowData.tableData.id
													dataUpdate[index] = newData
													setValues({
														balai: [...dataUpdate],
														alertMessage:
															'Update Balai Berhasil',
														successAlert: true
													})
													resolve()
												} else {
													setValues({
														...values,
														alertMessage: `Update Balai Gagal, ${result.message}`,
														successAlert: false
													})
													reject()
												}
												showAlert()
											}
										)
									}
								}),
							onRowDelete: (oldData) =>
								new Promise<void>((resolve) => {
									deleteBalai(oldData).then((result) => {
										if (result.success) {
											const dataDelete = [...values.balai]
											const oldRowData: any = oldData
											const index =
												oldRowData.tableData.id
											dataDelete.splice(index, 1)
											setValues({
												...values,
												balai: [...dataDelete],
												alertMessage:
													'Hapus Balai Berhasil',
												successAlert: true
											})
										} else {
											setValues({
												...values,
												alertMessage: `Hapus Balai Gagal, ${result.message}`,
												successAlert: false
											})
										}
										showAlert()
										resolve()
									})
								})
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(BalaiPage, false, true)
