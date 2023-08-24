import Overlay from "./Overlay";

interface RegisterProps {
    visible: boolean;
    handleConfirmSubmit: () => void;
    handleNotSubmit: any;
}

export function RegisterModal({visible, handleConfirmSubmit, handleNotSubmit} : RegisterProps) {

    if(!visible) {
        return null;
    }

return( 
        <Overlay bg="bg-white" width="w-[368px]" height="h-[160px]" >
            <p className="p-4 ml-6 mt-2 font-bold text-md text-secondary">Deseja criar a conta sem foto de perfil?</p>
                <div className="flex justify-end mt-[60px] mr-8 gap-4">
                    <button onClick={handleConfirmSubmit} className="text-tertiary font-bold">Sim</button>
                    <button onClick={(e) => handleNotSubmit()} className="text-tertiary font-bold">Colocar foto</button>
                </div>
        </Overlay>
            
    )
}