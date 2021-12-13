import DocumentPicker from "react-native-document-picker";
import uuid from 'react-native-uuid';


const pickFile = async (type = DocumentPicker.types.allFiles) => {
    try {
        const res = await DocumentPicker.pickSingle({type: type});
        const _id = uuid.v4();
        return {
            uri: res.uri,
            mime: res.type,
            name: res.name,
            size: res.size,
            _id: _id,
        }
    } catch (err) {
        console.log("FILE PICKER ERROR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", {err});
        console.log("FilePicker", err);
    }
}

export { pickFile }