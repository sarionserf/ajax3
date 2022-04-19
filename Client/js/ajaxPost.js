window.addEventListener("load", () => {


    let ajaxClass = new AjaxClass();

    ajaxClass.carregarContingut('/Server/comunitats.php', 'GET', null, function (text) {

        omplirSelects(text, 'ca', "ca_name")

    })

    document.getElementById('ca_name').addEventListener('change', function (event) {

        let desplegable1 = document.getElementById('ca_name');
        let desplegable = document.getElementById('pr_name');
        let desplegable2 = document.getElementById('il_name');
        let desplegable3 = document.getElementById('mu_name');


        let nomSelect = document.getElementsByTagName('label')[2]
        if (event.target) {
            desplegable.innerHTML = "";
            desplegable3.innerHTML = "";
            desplegable2.setAttribute("class", "hidden")
            nomSelect.setAttribute("class", "hidden")
        }
        desplegable.disabled = desplegable1.value <= 0;
        desplegable3.disabled = desplegable.value <= 0;


        ajaxClass.carregarContingut('/Server/provinciesByComunitat.php', 'POST', 'codiCom=' + event.target.value, function (text) {
            omplirSelects(text, 'prov', "pr_name");
        })

    })


    document.getElementById('pr_name').addEventListener('change', function (event) {

        let nomSelect = document.getElementsByTagName('label')[2]
        let desplegable1 = document.getElementById('pr_name');
        let desplegable = document.getElementById('il_name');
        let desplegable3 = document.getElementById('mu_name');
        desplegable.disabled = desplegable1.value <= 0;
        desplegable3.disabled = desplegable1.value <= 0;
        desplegable3.innerHTML = "";

        ajaxClass.carregarContingut('/Server/illes.php', 'POST', 'codiProv=' + event.target.value, function (text) {


            if (text.getElementsByTagName('illa').length > 0) {
                nomSelect.removeAttribute("class")
                desplegable.removeAttribute("class")
                desplegable.innerHTML = "";


                document.getElementById('il_name').addEventListener('change',function (event){
                    console.log(event.target.value)

                    if (event.target){
                        desplegable3.innerHTML = "";
                    }

                    ajaxClass.carregarContingut('/Server/municipisByProvincia.php', 'POST', 'codiIlla=' + event.target.value, function (text) {
                        omplirSelects(text, 'mun', "mu_name");
                    })


                })



            } else {
                nomSelect.setAttribute("class", "hidden")
                desplegable.setAttribute("class", "hidden")
                ajaxClass.carregarContingut('/Server/municipisByProvincia.php', 'POST', 'codiProv=' + event.target.value, function (text) {
                    omplirSelects(text, 'mun', "mu_name");
                })
            }
            omplirSelects(text, 'illa', "il_name");

        })


    })


});

//Callback funtions


function omplirSelects(text, tagneme, elementHTML) {
    let tags = text.getElementsByTagName(tagneme);
    let desplegable = document.getElementById(elementHTML);
    let optBuit = document.createElement('option');
    optBuit.value = '-1'
    desplegable.appendChild(optBuit);
    for (let tag of tags) {
        let codi = tag.children[0].textContent;
        let nom = tag.children[1].textContent;
        let opt = document.createElement('option');
        opt.value = codi;
        opt.innerText = nom;
        desplegable.appendChild(opt);

    }


}


   
