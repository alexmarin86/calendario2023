const contenedorCalendario = document.querySelector('section')

const datosCalendario = async () => {
	try {
		const response = await fetch('./calendario2023.json')
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

const construirCalendario = async () => {
	const datos = await datosCalendario()
	const htmlDias = datos.map((mes) => {
		let htmlParcial = `
            <div class="celda-nombre">L</div>
            <div class="celda-nombre">M</div>
            <div class="celda-nombre">X</div>
            <div class="celda-nombre">J</div>
            <div class="celda-nombre">V</div>
            <div class="celda-nombre">S</div>
            <div class="celda-nombre">D</div>`
		const totalCeldas = mes.numeroDias + mes.empiezaEl
		for (let i = 0; i < totalCeldas; i++) {
			if (i < mes.empiezaEl && mes.empiezaEl !== 0) {
				htmlParcial += `<div class="celda-dia"> </div>`
			} else {
				htmlParcial += `<div class="celda-dia">${
					i - mes.empiezaEl + 1
				}</div>`
			}
		}
		return htmlParcial
	})
	const htmlCalendario = datos.map((mes) => {
		return `
            <div class="contenedor-mes">
                <h2>${mes.mes}</h2>
                <div class="contenedor-semanas">${htmlDias[mes.id]}</div>
            </div>
        `
	})
	contenedorCalendario.innerHTML = htmlCalendario.join('')
	const celdas = document.querySelectorAll('.celda-dia')
	celdas.forEach((celda) => {
		if (celda.textContent == ' ') {
			celda.style.backgroundColor = 'transparent'
		}
	})
}

construirCalendario()
