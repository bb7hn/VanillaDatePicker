    //Constants
    const vanillaStyle=`
        .vanillaDatePicker{
            display: none;
            --date-picker-color:#000; 
            max-width: 18rem;
        }
        .vanillaDatePicker.active{
            display: block;
        }
        .vanillaDatePicker .btn{
            text-align: center;
            margin-left: 1px;
            margin-right: 1px;
            width: calc(100% / 7 - 2px);
            --bs-text-opacity: 1;
            color: rgba(var(--date-picker-color),var(--bs-text-opacity))!important;
            --bs-btn-padding-x: 0!important;
        }
        .vanillaDatePicker .day{
            --bs-btn-padding-x: 0.75rem;
            --bs-btn-padding-y: 0.375rem;
            --bs-btn-font-family: ;
            --bs-btn-font-size: 1rem;
            --bs-btn-font-weight: 400;
            --bs-btn-line-height: 1.5;
            --bs-btn-color: var(--date-picker-color);
            --bs-btn-bg: transparent;
            --bs-btn-border-width: 1px;
            --bs-btn-border-color: transparent;
            --bs-btn-border-radius: 0.375rem;
            --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),0 1px 1px rgba(0, 0, 0, 0.075);
            --bs-btn-disabled-opacity: 0.65;
            --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);
            display: inline-block;
            padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
            font-family: var(--bs-btn-font-family);
            font-size: var(--bs-btn-font-size);
            font-weight: var(--bs-btn-font-weight);
            line-height: var(--bs-btn-line-height);
            color: var(--bs-btn-color);
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: default;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
            border-radius: var(--bs-btn-border-radius);
            background-color: var(--bs-btn-bg);
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            text-align: center;
            margin-left: 1px;
            margin-right: 1px;
            width: calc(100% / 7 - 2px);
        }
        .vanillaDatePicker .btn-full{
            width: auto;
        }
        .gg-chevron-left {
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs,1));
            width: 22px;
            height: 22px;
            border: 2px solid transparent;
            border-radius: 100px
        }
        .gg-chevron-left::after {
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid;
            border-left: 2px solid;
            transform: rotate(45deg);
            left: 6px;
            top: 4px
        }
        .gg-chevron-right {
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs,1));
            width: 22px;
            height: 22px;
            border: 2px solid transparent;
            border-radius: 100px
        }
        .gg-chevron-right::after {
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid;
            border-right: 2px solid;
            transform: rotate(-45deg);
            right: 6px;
            top: 4px
        }
        .gg-calendar,
        .gg-calendar::before {
        display: block;
        box-sizing: border-box
        }

        .gg-calendar {
        position: relative;
        transform: scale(var(--ggs,1));
        width: 18px;
        height: 18px;
        border: 2px solid;
        border-top: 4px solid;
        border-radius: 3px
        }

        .gg-calendar::before {
        content: "";
        position: absolute;
        width: 10px;
        border-radius: 3px;
        left: 2px;
        background: currentColor;
        height: 2px;
        top: 2px
        } 
    `;
    const pickers={}
    const monthNames = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    const dayNames=[
        "Pt",
        "Sl",
        "Çr",
        "Pr",
        "Cm",
        "Ct",
        "Pz",
    ];
    const dayIndexes={
        0:6,
        1:0,
        2:1,
        3:2,
        4:3,
        5:4,
        6:5
    }
    //Functions
    const initMonth = (element,month)=>{   
        element.innerHTML = monthNames[month];
    }
    const initYear = (element,year)=>{   
        element.innerHTML = year;
    }
    const initPickerBody =(datePicker,pickerBody,index) => {
        let bodyContent = '<div class="d-flex align-items-center justify-content-center mb-1">';
            pickerBody.innerHTML = '';
            let lastIdx=0;
            
            for(let i=0;i<pickers[index].firstDayOfMonth;i++){
                bodyContent+=`
                    <button class="day">&nbsp;</button>
                `;
                lastIdx=i+1;
            }
            
            let end = pickers[index].lastDayOfMonth;
            for(let i=0; i<end;i++){
                if(lastIdx==7){
                    bodyContent+=`
                        </div>
                        <div class="d-flex align-items-center  mb-1">
                    `;
                    lastIdx = 0;
                }
                bodyContent+=`
                    <button class="btn selectBtn${pickers[index].selectedDay===i+1?' active bg-light':''}">${i+1}</button>
                `;
                lastIdx++;
            }
            pickerBody.innerHTML = bodyContent;
            let buttons = pickerBody.querySelectorAll('button.selectBtn');

            buttons.forEach(btn=>{
                btn.addEventListener('click',(e)=>{
                    buttons.forEach(b=>{
                        b.classList.remove('active');
                    });
                    e.currentTarget.classList.add('active');
                    
                    pickers[index].selectedDay = e.currentTarget.innerHTML;
                    
                    let input = datePicker.parentNode.querySelector('input[type="text"]');
                    let hiddenInput = datePicker.parentNode.querySelector('input[type="hidden"]');
                    input.value = `${pickers[index].selectedDay.length} ${monthNames[pickers[index].selectedMonth]} ${pickers[index].selectedYear}`;
                    hiddenInput.value = `${pickers[index].selectedYear}-${(pickers[index].selectedMonth+1)<10?'0'+(pickers[index].selectedMonth+1):pickers[index].selectedMonth}-${(pickers[index].selectedDay+1)<10?'0'+(pickers[index].selectedDay+1):pickers[index].selectedDay}`;
                    var event = new Event('change');
                    hiddenInput.dispatchEvent(event);
                    datePicker.classList.remove('active');
                });
            });
            
    }
    const initVanillaPicker = (datePicker,index,selectedMonth=new Date().getMonth(),selectedYear=new Date().getFullYear()) =>{
            (pickers.length?index = pickers.length-1:0);
            
            let pickerBody = datePicker.querySelector('.pickerBody');
            let pickerMonth = datePicker.querySelector('.pickerMonth');
            let pickerYear = datePicker.querySelector('.pickerYear');
            pickers[index] = {
                datePicker      : datePicker,
                selectedDay     : +new Date().toDateString().split(' ')[2],
                selectedMonth   : +selectedMonth,
                selectedYear    : +selectedYear,
                firstDayOfMonth : +dayIndexes[new Date(selectedYear, selectedMonth, 1).getDay()],
                lastDayOfMonth  : +new Date(selectedYear, selectedMonth + 1, 0).toDateString().split(' ')[2],
            };
            ((pickers[index].selectedDay>pickers[index].lastDayOfMonth)?pickers[index].selectedDay=1:0);
            initMonth(pickerMonth,pickers[index].selectedMonth);
            initYear(pickerYear,pickers[index].selectedYear);

            //Init day buttons
            initPickerBody(datePicker,pickerBody,index);

            let prevBtn = datePicker.querySelector('.pickerHeader .prevBtn');
            prevBtn.addEventListener('click',()=>{
                if(pickers[index].selectedMonth == 0){
                    selectedYear = pickers[index].selectedYear -= 1;
                    selectedMonth = pickers[index].selectedMonth = 11;
                }
                else{
                    selectedMonth = pickers[index].selectedMonth -= 1;
                }
                pickers[index].firstDayOfMonth = +dayIndexes[new Date(pickers[index].selectedYear, pickers[index].selectedMonth, 1).getDay()];
                pickers[index].lastDayOfMonth  = +new Date(pickers[index].selectedYear, pickers[index].selectedMonth + 1, 0).toDateString().split(' ')[2];
                initMonth(pickerMonth,pickers[index].selectedMonth);
                initYear(pickerYear,pickers[index].selectedYear);
                initPickerBody(datePicker,pickerBody,index);
            });
            let nextBtn = datePicker.querySelector('.pickerHeader .nextBtn');
            nextBtn.addEventListener('click',()=>{
                if(pickers[index].selectedMonth == 11){
                    pickers[index].selectedYear += 1;
                    pickers[index].selectedMonth = 0;
                }
                else{
                    pickers[index].selectedMonth += 1;
                }
                pickers[index].firstDayOfMonth = +dayIndexes[new Date(pickers[index].selectedYear, pickers[index].selectedMonth, 1).getDay()];
                pickers[index].lastDayOfMonth  = +new Date(pickers[index].selectedYear, pickers[index].selectedMonth + 1, 0).toDateString().split(' ')[2];
                initMonth(pickerMonth,pickers[index].selectedMonth);
                initYear(pickerYear,pickers[index].selectedYear);
                initPickerBody(datePicker,pickerBody,index);
            });
    }
    const initInputs = () => {
        let inputs = document.querySelectorAll('input[type="date"].vanilla-input');
        inputs.forEach(input=>{
            input.classList.remove('vanilla-input');
            let container= document.createElement('div');
            container.classList.add('position-relative');
            container.classList.add('d-flex');
            container.classList.add('flex-column');
            container.classList.add('align-items-center');
            let newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.setAttribute('class',input.getAttribute('class'));
            newInput.setAttribute('placeholder',input.getAttribute('placeholder')?input.getAttribute('placeholder'):'');
            newInput.setAttribute('style',input.getAttribute('style'));
            
            newInput.addEventListener('click',()=>{
                vanilla.classList.add('active');
                
                
            });
            let labels = document.querySelectorAll(`label[for="${input.id}"]`);
            labels.forEach(label=>{
                label.addEventListener('click',()=>{
                    vanilla.classList.add('active');
                    
                });
            });
            newInput.setAttribute('readonly','');
            let hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = input.name;
            hiddenInput.id = input.id;
            /* input.removeAttribute('id'); */
            let vanilla = document.createElement('div');
            vanilla.classList.add('rounded');
            vanilla.classList.add('p-1');
            vanilla.classList.add('vanillaDatePicker');
            vanilla.classList.add('border');
            vanilla.classList.add('mt-1');
            vanilla.classList.add('shadow');
            vanilla.classList.add('position-absolute');
            vanilla.classList.add('bg-light');
            
            vanilla.innerHTML=`
                <div class="row my-1">
                        <div class="col-12 d-flex align-items-center">
                            <i class="gg-calendar ms-2"></i>
                            <span class="ms-2">Tarih Seçin:</span>
                        </div>
                    </div>
                <div class="pickerHeader d-flex align-items-center justify-content-center mb-1 border-bottom py-1">
                    <div class="col-2 my-auto btn d-flex align-items-center justify-content-center prevBtn">
                        <i class="gg-chevron-left"></i>
                    </div>
                    <div class="col-8 my-auto text-center user-select-none d-flex align-items-center justify-content-center">
                        <div class="btn-full pickerMonth"></div>
                        <div class="btn-full pickerYear ms-1"></div>
                    </div>
                    <div class="col-2 my-auto btn d-flex align-items-center justify-content-center nextBtn">
                        <i class="gg-chevron-right"></i>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-center mb-1 ">
                    <button class="day d-flex align-items-center justify-content-center"><span>Pt</span></button>
                    <button class="day d-flex align-items-center justify-content-center"><span>Sl</span></button>
                    <button class="day d-flex align-items-center justify-content-center"><span>Çr</span></button>
                    <button class="day d-flex align-items-center justify-content-center"><span>Pr</span></button>
                    <button class="day d-flex align-items-center justify-content-center"><span>Cm</span></button>
                    <button class="day d-flex align-items-center justify-content-center"><span>Ct</span></button>
                    <button class="day d-flex align-items-center justify-content-center"><span>Pz</span></button>
                </div>
                <div class="pickerBody">
                    
                </div>
            `;
            container.appendChild(newInput);
            container.appendChild(hiddenInput);
            container.appendChild(vanilla);
            
            document.addEventListener('click', function handleClickOutsideBox(event) {
                // 👇️ the element the user clicked
                let bool = false;
                
                let hiddenInput = container.querySelector('input[type="hidden"]');
                if(hiddenInput){
                    event.composedPath().forEach((elem,key)=>{
                        try {
                            if(elem.tagName.toUpperCase() === "LABEL" && elem.getAttribute('for') === hiddenInput.id){
                                bool = true;
                            }
                        } catch (error) {
                            
                        }
                    });
                }
                
                
                if (!container.contains(event.target) && !bool) {
                    vanilla.classList.remove('active');
                }
                else{
                    newInput.focus();
                }
            });
            
            input.parentNode.insertBefore(container, input.nextSibling);
            /* console.log(newInput.getBoundingClientRect().top+newInput.clientHeight); */
            vanilla.style.setProperty('top',(newInput.clientHeight+5)+'px');
            vanilla.style.setProperty('z-index','9999');
            /* let now = new Date(); */
            
            initVanillaPicker(vanilla,input.id);
            input.remove();
        });
    }
    const insertAfter = (newNode, referenceNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    //init 
    document.addEventListener('DOMContentLoaded',()=>{
        window.pickersInitCompleted = false;
        document.head.innerHTML+=`<style>${vanillaStyle}</style>`;
        initInputs();
        window.pickersInitCompleted = true;
        /* console.log(pickers); */
    });
    /* 
    const firstDay = new Date(now.getFullYear() - 1, now.getMonth(), 1);
    console.log(firstDay); // 👉️ Sat Oct 01 2022 ...

    const lastDay = new Date(now.getFullYear() - 1, now.getMonth() + 1, 0);
    console.log(lastDay); // 👉️ Mon Oct 31 2022 ...
    */