import Link from "next/link"
import { FormattedStack } from "@/utils/querySupabase"

import { badgeVariants } from "@/components/ui/badge"

import StackItem from "./StackItem"

export default async function PersonalStack({
  stack,
}: {
  stack: FormattedStack
}) {
  return (
    <div className="mx-auto mt-6 space-y-8 px-0.5">
      <div>
        <h2 className="text-4xl font-bold">{stack.title}</h2>
        <div className="flex items-center justify-between space-y-1.5 text-sm">
          <Link
            href={`/${stack.user?.user_name}`}
            className={`${badgeVariants({
              variant: "default",
            })} w-fit items-center text-[13px]`}
            shallow={true}
          >
            <h2>{stack.user?.user_name}</h2>
          </Link>
          <div className="text-right text-muted-foreground">
            Updated <span className="font-medium">{stack.updated_at}</span>
          </div>
        </div>
        <p className="mt-2 text-sm ">{stack.description}</p>
      </div>
      <div className="mt-8 space-y-3">
        {stack.language && (
          <StackItem
            header="Language"
            iconPath="languages"
            icon={stack.language.icon}
            title={stack.language.title}
            description={stack.language.description}
            link={stack.language.link}
          />
        )}
        {stack.framework && (
          <StackItem
            header="Frontend"
            iconPath="frameworks"
            icon={stack.framework.icon}
            title={stack.framework.title}
            description={stack.framework.description}
            link={stack.framework.link}
          />
        )}
        {stack.meta_framework && (
          <StackItem
            header="Meta Framework"
            iconPath="meta_frameworks"
            icon={stack.meta_framework.icon}
            title={stack.meta_framework.title}
            description={stack.meta_framework.description}
            link={stack.meta_framework.link}
          />
        )}
        {stack.styling && (
          <StackItem
            header="Styling"
            iconPath="stylings"
            icon={stack.styling.icon}
            title={stack.styling.title}
            description={stack.styling.description}
            link={stack.styling.link}
          />
        )}
        {stack.ui_library && (
          <StackItem
            header="UI Library"
            iconPath="ui_libraries"
            icon={stack.ui_library.icon}
            title={stack.ui_library.title}
            description={stack.ui_library.description}
            link={stack.ui_library.link}
          />
        )}
        {stack.database && (
          <StackItem
            header="Database"
            iconPath="databases"
            icon={stack.database.icon}
            title={stack.database.title}
            description={stack.database.description}
            link={stack.database.link}
          />
        )}
        {stack.backend_framework && (
          <StackItem
            header="Backend"
            iconPath="backend_frameworks"
            icon={stack.backend_framework.icon}
            title={stack.backend_framework.title}
            description={stack.backend_framework.description}
            link={stack.backend_framework.link}
          />
        )}
        {stack.other_libraries &&
          stack.other_libraries.map((library) => (
            <StackItem
              key={library.id}
              header={
                library.other_library_category?.title
                  ? library.other_library_category.title
                  : "Misc. Library"
              }
              iconPath="other_libraries"
              icon={library.icon}
              title={library.title}
              description={library.description}
              link={library.link}
            />
          ))}
      </div>
    </div>
  )
}
