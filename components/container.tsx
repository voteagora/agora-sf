type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="container mx-auto bg-stone-50">{children}</div>
}

export default Container
