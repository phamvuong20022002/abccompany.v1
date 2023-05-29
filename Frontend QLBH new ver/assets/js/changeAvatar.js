function changeAvatar(dataUpdate, link, reloadAvatar) {
    let cloudName = "dayrqfwxo"
    let uploadPreset = "lmcv3avs"
    //config cloud connection
    const myWidget = cloudinary.createUploadWidget({
        cloudName: cloudName,
        uploadPreset: uploadPreset,
    }, async (error, result) => {
        // if updated successfully
        if (!error && result && result.event === "success") {
            document.getElementById("photo").setAttribute("src", result.info.secure_url);
            // update new image url to db
            dataUpdate.newurl = result.info.secure_url
            await fetch(link, {
                method: "PUT",
                body: JSON.stringify(dataUpdate),
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCode1(),
                }
            }).then((respone) => {
                authenticatePrivateAPIChecking(respone)
                return respone.json()
            }).then((data) => {
                if (Object.keys(data[0]) !== "ERROR") {
                    if(reloadAvatar) { 
                        localStorage.setItem("AVATAR", result.info.secure_url)
                    }
                    Swal.fire(
                        'Thay đổi ảnh đại diện thành công!',
                        data[0].RESULT,
                        'success'
                    ).then(() => {
                        location.reload();
                    })
                } else {
                    Swal.fire(
                        'Thay đổi ảnh đại diện thất bại!',
                        'Vui lòng thực hiện lại!',
                        'error'
                    ).then(() => {
                        location.reload();
                    })
                }
            })
        }
    })

    return myWidget
}