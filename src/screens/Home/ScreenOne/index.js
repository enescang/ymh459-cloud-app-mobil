import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TextInput, Button, Modal, TouchableOpacity } from 'react-native';

import { P, Clickable, Space } from '../../../components'
import { pickFile } from '../../../Ops/FilePicker';
import { copy_file, create_dir, get_dir_for_meme_type, get_extension_from_mime } from '../../../Ops/Fs';
import { actions } from '../../../state';
import { connect } from 'react-redux';
import { Request } from '../../../request';
import axios from 'axios';

class ScreenOne extends Component {

    state = {
        uploadProgess: 0,
        modalVisible: false,
        selectedFile: {},
        currentFileId: null,
        accept: null,
    }


    renderItem(file, index) {
        const {currentFileId} = this.state;
        return (
            <Clickable loading={file._id == currentFileId} onClick={() => this.setState({modalVisible:true, selectedFile:file})} animSize={0.98}>
                <View style={styles.renderItem}>
                    <P color={'#242424'} size={'l'} bold>{index}.{file.name}</P>
                    <P color={'#242424'} size={'s'} bold>{file.is_uploaded ? "Yüklendi" : "Yüklenmedii..."}</P>
                </View>
            </Clickable >
        )
    }

    select_file = async () => {
        console.log("File starter")
        const file = await pickFile();
        console.log({ file });
        const { uri, size, mime, name, _id } = file;
        const target_dir = await get_dir_for_meme_type(mime);
        const extension = await get_extension_from_mime(mime);
        const full_path = `${target_dir}${_id}.${extension}`;
        await create_dir(target_dir);
        const copy_result = await copy_file(uri, full_path);
        if (copy_result) {
            actions.auth.UpdateOrAddFile({uri, size, mime, name, _id, is_uploaded: false }, async ({ data, error }) => {
                if (data) {
                    setTimeout(async() => {
                        await this.start_upload(file);
                    }, 1000);
                }
            })
        }
        console.log({ copy_result })
    }

    start_upload = async (file) => {
        try {
            this.setState({modalVisible:false, currentFileId: file._id})
            const { uri, size, mime, name, _id } = file;
            const _f = {
                uri: `${get_dir_for_meme_type(mime)}/${_id}.${get_extension_from_mime(mime)}`,
                name: name,
                type: mime,
            };
            _f.uri = `file://${_f.uri}`
            console.log(_f)
            const form = new FormData();
            form.append("file", _f);
            form.append("file_name", name)

            const { data } = await axios.post(`${Request.baseURL}/file/upload`, form, {
                headers: { "Content-Type": "multipart/form-data" }, onUploadProgress: (progressEvent) => {
                    console.log(progressEvent, "PROGRESS EVENT------------------------------------------------------------------------------")
                    this.setState({ uploadProgess: progressEvent.loaded / progressEvent.total * 100 })
                }
            });
            console.log(data, "UPLAODAD RESULT");
            actions.auth.UpdateOrAddFile({ uri, size, mime, name, _id, is_uploaded: true }, (result) => {
                if (result.data) {
                    alert("file uploaded successfully");
                }
                if (result.error) {
                    alert("file NOT uploaded");
                }

            })
        } catch (error) {
            alert(error + "&&&")
        }
        this.setState({ uploadProgess: 0, currentFileId: null });
    }

    remove_file = async(_id)=>{
        actions.auth.RemoveFile({_id}, ({data, error})=>{
            if(error){
                alert(error)
            }
            this.setState({modalVisible:false, accept:null});
        });
    }

    modal() {
        const { modalVisible, selectedFile} = this.state;
        return (
            <Modal
                statusBarTranslucent
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    this.setState({ modalVisible: !modalVisible })
                }}
            >
                <TouchableOpacity style={styles.centeredView} onPress={() => this.setState({ modalVisible: false })} activeOpacity={1}>
                    <View style={[styles.modalView, { backgroundColor: '#e8e9eb' }]}>
                        <P size={"l"} color={'#4c4c4c'} type={'b'}>Dosya Bilgileri</P>
                        <Space v={'s'} h={'n'} />
                        <P size={"d"} color={'#4c4c4c'} type={'l'} align={'center'}>Dosya Hakkında</P>

                        <TextInput
                            style={styles.input}
                            onChangeText={d => this.setState({ accept: d })}
                            value={this.state.accept}
                            placeholder="ONAY YAZIN"
                            placeholderTextColor={'#959595'}
                            maxLength={4}
                        />

                          <Clickable onClick={()=>{
                              this.state.accept == "ONAY" ? this.remove_file(selectedFile._id) : ()=>{}
                          }} animSize={0.95}>
                                <View style={[styles.continueButton]}>
                                    <P color={this.state.accept == "ONAY" ? '#2e5469': "gray"} size={'d'} bold>SİL</P>
                                </View>
                            </Clickable>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Clickable onClick={()=>this.start_upload(selectedFile)} animSize={0.95}>
                                <View style={[styles.continueButton]}>
                                    <P color={'#2e5469'} size={'d'} bold>YENİDEN YÜLE</P>
                                </View>
                            </Clickable>
                            <Space v={'m'} h={'m'} />
                            <Clickable onClick={() => this.setState({ modalVisible: !modalVisible })} animSize={0.95}>
                                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                                    <P size={"d"} color={'#4c4c4c'} type={'sb'}>
                                        Kapat
                                    </P>
                                </View>
                            </Clickable>
                        </View>
                        <Space v={'s'} h={'m'} />
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.modal()}
                <Button
                    onPress={this.select_file}
                    title='Select File'
                />
                {
                    this.state.uploadProgess > 0 &&
                    <P color={'#242424'} size={'l'} center bold>Yükleniyor: {this.state.uploadProgess}%</P>
                }
                <View style={styles.main}>
                    <View style={styles.mainPadding}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.props.auth.files}
                            renderItem={(d) => this.renderItem(d.item, d.index)}
                            keyExtractor={(item, index) => index.toString()}
                        // contentContainerStyle={{ bottom: 80 }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f3f4'
    },

    renderItem: {
        flex: 1,
        backgroundColor: '#f5f3f4',
        marginVertical: 10,
    },

    main: {
        flex: 1,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderWidth: 1,
        borderBottomWidth: 0,
        marginHorizontal: -1,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },

    mainPadding: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 50,
    },

    input: {
        width: 295,
        margin: 15,
        borderBottomWidth: 1,
        borderColor: '#C6C6C6',
        color: '#000000'
    },

    // Modal Styles START
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0, 0.4)',
    },

    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        paddingBottom: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    parentHr: {
        alignSelf: 'center',
        width: '90%',
        height: 1,
    },
    // Modal Styles END

})

const mapStateToProps = ({ auth }) => {
    return { auth };
}

ScreenOne = connect(mapStateToProps)(ScreenOne);

export default ScreenOne;