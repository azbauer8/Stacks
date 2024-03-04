import { Suspense } from "react"
import { Tables } from "@/supabase/dbTypes"
import { getFormFieldOptions } from "@/supabase/queries"
import cn from "@/utils/cn"
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react"

import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/general/PageHeader"
import { textVariant } from "@/components/general/Typography"

export default function GuidePage() {
  return (
    <div className="space-y-5">
      <PageHeader>
        <PageTitle>Reference Guide</PageTitle>
        <PageDescription>
          {
            "A list of all the libraries and tools I've catalogued on this so far."
          }
        </PageDescription>
      </PageHeader>
      <Suspense fallback={<div />}>
        <Guide />
      </Suspense>
    </div>
  )
}

async function Guide() {
  const data = await getFormFieldOptions()

  const groupedOtherLibraries = groupAndSortByCategory(data.otherLibraries)

  return (
    <div className="space-y-5">
      <Card className="h-full border-2 border-divider/10 p-1">
        <CardHeader>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Languages
          </h2>
        </CardHeader>
        <CardBody className=" text-sm text-default-500">
          {data.languages.map((language) => (
            <a
              href={language.link ?? "/"}
              target="_blank"
              rel="noreferrer"
              key={language.id}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-default-100"
            >
              <Avatar
                src={language.icon ?? ""}
                alt={language.title}
                size="lg"
                classNames={{
                  img: language.has_dark_icon ? "dark:invert" : "",
                }}
              />
              <div className="flex flex-1 flex-col gap-1">
                <p
                  className={cn(
                    textVariant({ variant: "large" }),
                    "text-foreground"
                  )}
                >
                  {language.title}
                </p>
                <p className={textVariant({ variant: "small" })}>
                  {language.description}
                </p>
              </div>
            </a>
          ))}
        </CardBody>
      </Card>
      <Card className="h-full border-2 border-divider/10 p-1">
        <CardHeader>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Frameworks
          </h2>
        </CardHeader>
        <CardBody className=" text-sm text-default-500">
          {data.frameworks.map((framework) => (
            <a
              href={framework.link ?? "/"}
              target="_blank"
              rel="noreferrer"
              key={framework.id}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-default-100"
            >
              <Avatar
                src={framework.icon ?? ""}
                alt={framework.title}
                size="lg"
                classNames={{
                  img: framework.has_dark_icon ? "dark:invert" : "",
                }}
              />
              <div className="flex flex-1 flex-col gap-1">
                <p
                  className={cn(
                    textVariant({ variant: "large" }),
                    "text-foreground"
                  )}
                >
                  {framework.title}
                </p>
                <p className={textVariant({ variant: "small" })}>
                  {framework.description}
                </p>
              </div>
            </a>
          ))}
        </CardBody>
      </Card>
      <Card className="h-full border-2 border-divider/10 p-1">
        <CardHeader>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Meta Frameworks
          </h2>
        </CardHeader>
        <CardBody className=" text-sm text-default-500">
          {data.metaFrameworks.map((metaFramework) => (
            <a
              href={metaFramework.link ?? "/"}
              target="_blank"
              rel="noreferrer"
              key={metaFramework.id}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-default-100"
            >
              <Avatar
                src={metaFramework.icon ?? ""}
                alt={metaFramework.title}
                size="lg"
                classNames={{
                  img: metaFramework.has_dark_icon ? "dark:invert" : "",
                }}
              />
              <div className="flex flex-1 flex-col gap-1">
                <p
                  className={cn(
                    textVariant({ variant: "large" }),
                    "text-foreground"
                  )}
                >
                  {metaFramework.title}
                </p>
                <p className={textVariant({ variant: "small" })}>
                  {metaFramework.description}
                </p>
              </div>
            </a>
          ))}
        </CardBody>
      </Card>
      <Card className="h-full border-2 border-divider/10 p-1">
        <CardHeader>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Styling
          </h2>
        </CardHeader>
        <CardBody className=" text-sm text-default-500">
          {data.stylings.map((styling) => (
            <a
              href={styling.link ?? "/"}
              target="_blank"
              rel="noreferrer"
              key={styling.id}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-default-100"
            >
              <Avatar
                src={styling.icon ?? ""}
                alt={styling.title}
                size="lg"
                classNames={{
                  img: styling.has_dark_icon ? "dark:invert" : "",
                }}
              />
              <div className="flex flex-1 flex-col gap-1">
                <p
                  className={cn(
                    textVariant({ variant: "large" }),
                    "text-foreground"
                  )}
                >
                  {styling.title}
                </p>
                <p className={textVariant({ variant: "small" })}>
                  {styling.description}
                </p>
              </div>
            </a>
          ))}
        </CardBody>
      </Card>
      <Card className="h-full border-2 border-divider/10 p-1">
        <CardHeader>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            UI Libraries
          </h2>
        </CardHeader>
        <CardBody className=" text-sm text-default-500">
          {data.uiLibraries.map((uiLibrary) => (
            <a
              href={uiLibrary.link ?? "/"}
              target="_blank"
              rel="noreferrer"
              key={uiLibrary.id}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-default-100"
            >
              <Avatar
                src={uiLibrary.icon ?? ""}
                alt={uiLibrary.title}
                size="lg"
                classNames={{
                  img: uiLibrary.has_dark_icon ? "dark:invert" : "",
                }}
              />
              <div className="flex flex-1 flex-col gap-1">
                <p
                  className={cn(
                    textVariant({ variant: "large" }),
                    "text-foreground"
                  )}
                >
                  {uiLibrary.title}
                </p>
                <p className={textVariant({ variant: "small" })}>
                  {uiLibrary.description}
                </p>
              </div>
            </a>
          ))}
        </CardBody>
      </Card>
      <Card className="h-full border-2 border-divider/10 p-1">
        <CardHeader>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Databases
          </h2>
        </CardHeader>
        <CardBody className=" text-sm text-default-500">
          {data.databases.map((database) => (
            <a
              href={database.link ?? "/"}
              target="_blank"
              rel="noreferrer"
              key={database.id}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-default-100"
            >
              <Avatar
                src={database.icon ?? ""}
                alt={database.title}
                size="lg"
                classNames={{
                  img: database.has_dark_icon ? "dark:invert" : "",
                }}
              />
              <div className="flex flex-1 flex-col gap-1">
                <p
                  className={cn(
                    textVariant({ variant: "large" }),
                    "text-foreground"
                  )}
                >
                  {database.title}
                </p>
                <p className={textVariant({ variant: "small" })}>
                  {database.description}
                </p>
              </div>
            </a>
          ))}
        </CardBody>
      </Card>
      <Card className="h-full border-2 border-divider/10 p-1">
        <CardHeader>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Backend Frameworks
          </h2>
        </CardHeader>
        <CardBody className=" text-sm text-default-500">
          {data.backendFrameworks.map((backendFramework) => (
            <a
              href={backendFramework.link ?? "/"}
              target="_blank"
              rel="noreferrer"
              key={backendFramework.id}
              className="flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-default-100"
            >
              <Avatar
                src={backendFramework.icon ?? ""}
                alt={backendFramework.title}
                size="lg"
                classNames={{
                  img: backendFramework.has_dark_icon ? "dark:invert" : "",
                }}
              />
              <div className="flex flex-1 flex-col gap-1">
                <p
                  className={cn(
                    textVariant({ variant: "large" }),
                    "text-foreground"
                  )}
                >
                  {backendFramework.title}
                </p>
                <p className={textVariant({ variant: "small" })}>
                  {backendFramework.description}
                </p>
              </div>
            </a>
          ))}
        </CardBody>
      </Card>
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
        Other Libraries
      </h2>
      {Object.keys(groupedOtherLibraries).map((categoryTitle, index) => (
        <Card key={index} className="h-full border-2 border-divider/10 p-1">
          <CardHeader>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              {categoryTitle}
            </h2>
          </CardHeader>
          <CardBody className=" text-sm text-default-500">
            {groupedOtherLibraries[categoryTitle].map(
              (library: Tables<"other_libraries">, idx: number) => (
                <a
                  href={library.link ?? "/"}
                  target="_blank"
                  rel="noreferrer"
                  key={idx}
                  className="flex w-full items-center gap-4 rounded-lg px-3 py-4 hover:bg-default-100"
                >
                  <Avatar
                    src={library.icon ?? ""}
                    alt={library.title}
                    size="lg"
                    classNames={{
                      img: library.has_dark_icon ? "dark:invert" : "",
                    }}
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p
                      className={cn(
                        textVariant({ variant: "large" }),
                        "text-foreground"
                      )}
                    >
                      {library.title}
                    </p>
                    <p className={textVariant({ variant: "small" })}>
                      {library.description}
                    </p>
                  </div>
                </a>
              )
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

type OtherLibrary = Tables<"other_libraries"> & {
  other_library_category: {
    title: string
  } | null
}

interface GroupedByCategory {
  [key: string]: OtherLibrary[]
}
function groupAndSortByCategory(data: OtherLibrary[]): GroupedByCategory {
  const groupedByCategory: GroupedByCategory = data.reduce(
    (acc: GroupedByCategory, obj: OtherLibrary) => {
      const categoryTitle = obj.other_library_category?.title || "Uncategorized"

      if (!acc[categoryTitle]) {
        acc[categoryTitle] = []
      }

      acc[categoryTitle].push(obj)
      return acc
    },
    {}
  )

  const sortedGroupedByCategory: GroupedByCategory = Object.entries(
    groupedByCategory
  )
    .sort((a, b) => a[0].localeCompare(b[0]))
    .reduce((acc: GroupedByCategory, [key, value]) => {
      acc[key] = value
      return acc
    }, {})

  return sortedGroupedByCategory
}
