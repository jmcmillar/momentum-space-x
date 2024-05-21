import { TitleBar } from "../components/TitleBar"
import { LaunchForm } from "../components/new_launch"

export const NewLaunchPage = () => {
  return(
    <div className="mx-6">
      <TitleBar title="New Launch" />
      <div className="my-12">
        <LaunchForm />
      </div>
    </div>
  )
}
