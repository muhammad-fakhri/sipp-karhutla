const hakAksesPageStyle = {
	root: {
		margin: 0
	},
	title: {
		color: '#000000'
	},
	textCenter: {
		textAlign: 'center' as const
	},
	gridContainer: {
		width: '100%',
		padding: '12vh 0 4vh 0'
	},
	gridItem: {
		marginTop: '16px',
		backgroundColor: '#ffffff'
	},
	buttonBase: {
		width: '60%',
		background: '#FFFFFF',
		color: 'black',
		padding: '8px 32px',
		marginBottom: '16px',
		borderRadius: '8px',
		boxShadow:
			'0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
	},
	closeButton: {
		position: 'absolute' as const,
		right: '8px',
		top: '8px',
		color: '#e6e1e1'
	},
	dialogTitle: {
		marginRight: '32px'
	}
}

export default hakAksesPageStyle
