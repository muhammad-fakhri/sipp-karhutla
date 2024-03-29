import { container } from '@asset/jss/nextjs-material-kit'

const loginPageStyle = {
	container: {
		...container,
		zIndex: 2,
		position: 'relative' as const,
		paddingTop: '20vh',
		color: '#FFFFFF',
		paddingBottom: '200px'
	},
	cardHidden: {
		opacity: '0',
		transform: 'translate3d(0, -60px, 0)'
	},
	pageHeader: {
		minHeight: '100vh',
		height: 'auto',
		display: 'inherit',
		position: 'relative' as const,
		margin: '0',
		padding: '0',
		border: '0',
		alignItems: 'center',
		'&:before': {
			background: 'rgba(0, 0, 0, 0.5)'
		},
		'&:before,&:after': {
			position: 'absolute',
			zIndex: '1',
			width: '100%',
			height: '100%',
			display: 'block',
			left: '0',
			top: '0',
			content: '""'
		},
		'& footer li a,& footer li a:hover,& footer li a:active': {
			color: '#FFFFFF'
		},
		'& footer': {
			position: 'absolute',
			bottom: '0',
			width: '100%'
		}
	},
	form: {
		margin: '0'
	},
	cardHeader: {
		width: 'auto',
		textAlign: 'center' as const,
		marginLeft: '20px',
		marginRight: '20px',
		marginTop: '-40px',
		padding: '20px 0',
		marginBottom: '15px'
	},
	cardFooter: {
		paddingTop: '0rem',
		border: '0',
		borderRadius: '6px',
		justifyContent: 'center !important',
		color: '#ffffff'
	}
}

export default loginPageStyle
