import { useRouter } from 'next/router'
import { Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import classNames from 'classnames'
import MaterialTable from 'material-table'
import useSWR from 'swr'
import { Alert } from '@material-ui/lab'
import styles from '../../../assets/jss/nextjs-material-kit/pages/posko.page.style'
import SiteLayout from '../../../components/Layout/SiteLayout'
import PoskoService from '../../../services/posko.service'
import useAuth, { ProtectRoute } from '../../../context/auth'
import Loader from '../../../components/Loader/Loader'

const useStyles = makeStyles(styles)
const column = [
	{ title: 'Posko', field: 'name' },
	{ title: 'Daops', field: 'daops' },
	{
		title: 'Kecamatan',
		field: 'kecamatan'
	}
]

function PoskoPage() {
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const { message } = router.query
	const classes = useStyles()
	const [posko, setPosko] = React.useState([])
	const [showAlert, setShowAlert] = React.useState(false)
	const [alertType, setAlertType] = React.useState('success')
	const [alertMessage, setAlertMessage] = React.useState()
	const { data: dataPosko, isValidating } = useSWR(
		isAuthenticated ? '/posko/list' : null,
		PoskoService.getAllPosko
	)
	React.useEffect(() => {
		if (message) {
			setAlertMessage(message)
			setAlertType('success')
			setShowAlert(true)
		}
	}, [])
	React.useEffect(() => {
		setPosko(dataPosko)
	}, [dataPosko])

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
				<h2>Data Posko</h2>
				{showAlert ? (
					<Alert
						severity={alertType}
						onClose={() => setShowAlert(false)}
					>
						{alertMessage}
					</Alert>
				) : null}
				{isValidating ? (
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
						data={posko}
						options={{
							search: true,
							actionsColumnIndex: -1,
							addRowPosition: 'first'
						}}
						localization={{
							body: {
								editRow: {
									deleteText: 'Yakin hapus data ini ?'
								},
								deleteTooltip: 'Hapus data posko'
							},
							header: { actions: 'Aksi' }
						}}
						actions={[
							{
								icon: AddBoxIcon,
								tooltip: 'Tambah data posko',
								isFreeAction: true,
								onClick: () =>
									router.push('/wilayah/posko/tambah')
							},
							{
								icon: 'edit',
								tooltip: 'Ubah data posko',
								onClick: (event, rowData) =>
									router.push(
										`/wilayah/posko/ubah/${rowData.id}`
									)
							}
						]}
						editable={{
							onRowDelete: (oldData) =>
								new Promise((resolve, reject) => {
									PoskoService.deletePosko(oldData).then(
										(result) => {
											if (result.success) {
												const dataDelete = [...posko]
												const index =
													oldData.tableData.id
												dataDelete.splice(index, 1)
												setPosko(dataDelete)
												setAlertType('success')
												setAlertMessage(
													'Hapus data posko berhasil'
												)
												setShowAlert(true)
												resolve()
											} else {
												setAlertType('error')
												setAlertMessage(result.message)
												setShowAlert(true)
												reject()
											}
										}
									)
								})
						}}
					/>
				)}
			</div>
		</SiteLayout>
	)
}

export default ProtectRoute(PoskoPage)