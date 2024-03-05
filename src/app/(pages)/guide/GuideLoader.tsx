import { Avatar, Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react"

const sections = [
  "Languages",
  "Frameworks",
  "Meta Frameworks",
  "Styling",
  "UI Libraries",
  "Databases",
  "Backend Frameworks",
]

export default function GuideLoader() {
  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <Card key={section} className="h-full border-2 border-divider/10 p-1">
          <CardHeader>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              {section}
            </h2>
          </CardHeader>
          <CardBody className=" text-sm text-default-500">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="flex w-full items-center gap-4 rounded-lg px-3 py-4 "
              >
                <Avatar
                  size="lg"
                  showFallback
                  fallback={<Skeleton className="size-14 rounded-full" />}
                />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-8 w-32 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
