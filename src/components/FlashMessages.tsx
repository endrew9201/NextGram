interface FlashMessagesProps {
    message: string
    type: string

}

const FlashMessages: React.FC<FlashMessagesProps> = ({message, type}) => {
  return (
    <div className={`fixed top-20 right-0 p-4 shadow-md text-white rounded ${type === "sucess" ? "bg-emerald-600" : "bg-red-600"}`}>
        {message}
    </div>
  )
}



export default FlashMessages
