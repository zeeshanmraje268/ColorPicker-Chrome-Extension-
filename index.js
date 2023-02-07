const pickerBtn=document.querySelector('#color-picker');
const pickedColor=JSON.parse(localStorage.getItem('picked-colors')||'[]');
const colorList=document.querySelector('.all-colors');
const clearAll=document.querySelector('.clear-all');



/* copy colorcode */
const copyColor=(elem)=>{
   navigator.clipboard.writeText(elem.dataset.color);
   elem.innerText='copied';
   setTimeout(() =>elem.innerText = elem.dataset.color,1000);
}

const showColors=()=>{
   if(!pickedColor.length) return ;
   document.querySelector('.picked').classList.remove('hide'); 
   colorList.innerHTML= pickedColor.map((color)=>`
<li class="color">
<span style="background:${color}" class="rect"></span>
<span class="value" data-color='${color}'   >${color}</span>
</li>
   `).join('');
   
  
   // Add Click event to copy color
   document.querySelectorAll('.color').forEach(li=>{
      li.addEventListener('click',(e)=>copyColor(e.currentTarget.lastElementChild))
   })
}


const activateEyeDropper = async ()=>{
   
   try{
   const eyeDropper= new EyeDropper();
   const {sRGBHex}= await eyeDropper.open();
   navigator.clipboard.writeText(sRGBHex);
   
  
  
  /* adding color to the list if it doesn't exist in the list */
   if(!pickedColor.includes(sRGBHex)){
   pickedColor.push(sRGBHex);
   localStorage.setItem('picked-colors',JSON.stringify(pickedColor));
   showColors();
}
   }catch(error){
      console.log(error);
   }
   
}

const clearAllColors=()=>{
   colorList.innerHTML='';
   pickedColor.length=0;
   localStorage.setItem('picked-colors',JSON.stringify(pickedColor));
}


clearAll.addEventListener('click',clearAllColors);
pickerBtn.addEventListener('click',activateEyeDropper);