type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="container mx-auto bg-stone-50 max-w-prose">{children}</div>
}

export default Container
