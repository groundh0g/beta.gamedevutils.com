import './DialogAddImages.css';

export type DialogAddImagesProps = {
    show: boolean,
    onConfirm: (value: string[]) => void,
    onCancel: () => void,
};



export default function DialogAddImages(props: DialogAddImagesProps) {
    const dialog = document.querySelector(`#DialogAddImages`) as HTMLDialogElement;
    const isShown = props.show;

    if(isShown) {
        dialog.showModal();
    }

    return (
        <dialog id="DialogAddImages">
            <div id="assetDropzone" className="assetDropzone">
                <p>Drag and drop your files here, or</p>
                <p>Click the button to browse files.</p>
                <a className="link-button primary" href="#null" onClick={() => {
                }}>Browse Files</a>
                <p>No files selected.</p>
            </div>
            <a className="link-button" href="#null" onClick={() => {
                dialog.close();
                props.onCancel();
            }}>Cancel</a>
            <a className="link-button primary" href="#null" onClick={() => {
                dialog.close();
                props.onConfirm([] as string[]);
            }}>Load</a>
        </dialog>
    );
}
