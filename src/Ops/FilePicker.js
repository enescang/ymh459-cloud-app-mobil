import DocumentPicker from "react-native-document-picker";

const pickFile = async (type = DocumentPicker.types.allFiles) => {
    try {
        const res = await DocumentPicker.pickSingle({type: type})
        return {
            uri: res.uri,
            mime: res.type,
            name: res.name,
            size: res.size
        }
    } catch (err) {
        console.log("FILE PICKER ERROR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", {err});
        console.log("FilePicker", err);
    }
}

export { pickFile }