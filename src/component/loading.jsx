import  Style from '../../styles/Loading.module.css'

export const Loading = () => {
    return(
        <div className="w-[100%] h-[100vh] flex justify-center items-center">
            <div className={Style.spinner}></div>
        </div>
    )
}