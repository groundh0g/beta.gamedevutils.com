import './DialogAddImages.css';
import {addImage, log} from "../../../features/appSlice.ts";
import {useDispatch} from "react-redux";
// import {DragEventHandler, EventHandler} from "react";

export type DialogAddImagesProps = {
    show: boolean,
    onConfirm: (value: string[]) => void,
    onCancel: () => void,
};




export default function DialogAddImages(props: DialogAddImagesProps) {

    const ignoreEvent = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    // const drop = (e: any) => {
    //     ignoreEvent(e);
    //
    //     const dt = e.dataTransfer;
    //     if(dt) handleFiles(dt.files);
    // };

    const handleFiles = (fileList: FileList | File[]) => {
        if (fileList) {
            dispatch(log(`Loading ${fileList.length} asset(s)...`));
            for (const file of fileList) {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (e.target) {
                            const data = e.target.result;
                            // console.log(data);
                            dispatch(addImage(`${file.name}|${data}`));
                        }
                    };

                    const cleanSize = (size: number) => {
                        return Math.round(size * 10) / 10.0;
                    };

                    const size = file.size;
                    const sizeString: string =
                        size > 999999999999 ? `${cleanSize(size/1000000000000)}TB` :
                            size > 999999999 ? `${cleanSize(size/1000000000)}GB` :
                                size > 999999 ? `${cleanSize(size/1000000)}MB` :
                                    size > 999 ? `${cleanSize(size/1000)}K` :
                                        `${size}B`;

                    dispatch(log(`${file.name} (${sizeString})`));
                    reader.readAsDataURL(file);
                    // console.log(file.name, file.type, file.size);
                }
            }

            // dispatch(log(`&nbsp;&nbsp;Done.`));
        }
    };

    const dialog = document.querySelector(`#DialogAddImages`) as HTMLDialogElement;
    const isShown = props.show;

    const dispatch = useDispatch();

    if(isShown) {
        dialog.showModal();
    }

    return (
        <dialog id="DialogAddImages">
            <div
                id="assetDropzone"
                className="assetDropzone"
                onDragEnter={ignoreEvent}
                onDragOver={ignoreEvent}
                onDrop={(e) => {
                    const fileList = e.dataTransfer.files;
                    ignoreEvent(e);
                    handleFiles(fileList);
                    dialog.close();
                    props.onConfirm([] as string[]);
                }}
            >
                <p>Drag and drop your files here, or</p>
                <p>Click the "browse" button to select files.</p>
                <input
                    type="file"
                    id="filePicker"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                        ignoreEvent(e);
                        if(e.target.files) {
                            handleFiles(e.target.files);
                        }
                        dialog.close();
                        props.onConfirm([] as string[]);
                    }}
                />

            </div>
            <a className="link-button" href="#null" onClick={() => {
                dialog.close();
                props.onCancel();
            }}>Close</a>
            <a className="link-button primary" href="#null" onClick={() => {
                const filePicker = document.getElementById("filePicker") as HTMLInputElement;
                filePicker.click();
            }}>Browse ...</a>
        </dialog>
    );
}
