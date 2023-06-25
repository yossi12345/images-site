import axios from 'axios';
export async function handleSubmit(formElement,setImages){
    const formData=new FormData(formElement)
    const url=process.env.REACT_APP_SERVER_URL+"upload"
    console.log(url)
    try{
        const {data:image}=await axios.post(url,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        console.log(image)
        await setSourceOnImage(image)
        setImages(currentImages=>(
            [...currentImages,image]
        ))
    }catch(err){
        console.log(err)
        alert("sorry we didnt succeed to upload the images")
    }   
}
export async function handleSetImagesFirstTime(setImages){
    const url=process.env.REACT_APP_SERVER_URL+"get-all"
    console.log(url)
    try {
        const {data:images}=await axios.get(url)//עשיתי את זה מאוד מוזר התמונות שמתקבלות כאן הן בלי מקור כדי לקבל מקור יש ללכת לראוט אחר
        for (let i=0;i<images.length;i++)
            await setSourceOnImage(images[i])
        
        console.log(images)
        setImages(images)
    }catch(err){
        console.log(err)
        alert("sorry we didnt succeed to get the images")
    }
}
async function setSourceOnImage(image){
    const url=process.env.REACT_APP_SERVER_URL+"get-image-source?key="+image.key
    
    try{
        const {data:imageSource}=await axios.get(url)
        image.source=imageSource
    }catch(err){
        console.log(err)
    }
}
export async function deleteImage(image,setImages){
    const url=process.env.REACT_APP_SERVER_URL+"delete?key="+image.key+"&_id="+image._id
    console.log(url)
    try{
        await axios.delete(url,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        setImages((currentImages)=>(
            currentImages.toSpliced(currentImages.indexOf(image),1)
        ))
    }catch(err){
        console.log(err)
        alert("sorry we didnt succeed to delete the image")
    }
}
