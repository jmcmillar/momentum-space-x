import { Tabs } from "../components/Tabs"
import { TitleBar } from "../components/TitleBar"
import { LaunchForm } from "../components/new_launch"

export const NewLaunchPage = () => {
  return(
    <>
    <TitleBar title="New Launch" />
    <Tabs />
    <div className="mx-6">
      <div className="my-12">
        <LaunchForm />
      </div>
    </div>
    </>
  )
}
