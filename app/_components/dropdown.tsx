import {ReactNode, ReactElement} from 'react'

export default function DD({ children, title }: { children: ReactElement, title: ReactNode|string}){
  return (
    <div className="group relative">
      <span className="peer">{title}</span>
      <div className="group-hover:scale-100 scale-y-0 absolute right-[-20px] transition-transform duration-300 origin-top">
	{children}
      </div>
    </div>
  )
}
