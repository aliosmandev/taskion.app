import {
  Chip,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
//   import { UserProfile } from './user-profile'

interface PageType {
  title: string;
  id: string;
}

const DUMMY_PAGES = [
  { id: "1", properties: { title: { title: [{ plain_text: "Page 1" }] } } },
  { id: "2", properties: { title: { title: [{ plain_text: "Page 2" }] } } },
  { id: "3", properties: { title: { title: [{ plain_text: "Page 3" }] } } },
  { id: "4", properties: { title: { title: [{ plain_text: "Page 4" }] } } },
  { id: "5", properties: { title: { title: [{ plain_text: "Page 5" }] } } },
];

const addEllipsisIfSplittable = (text: string) => {
  const parts = text?.split(" ");
  return parts?.length > 1 ? parts[0] + ".." : parts?.[0];
};

const useAuthContext = () => ({ loggedIn: true });
const usePagesContext = () => {
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [activePages, setActivePages] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
  ]);

  const handleDeletePage = (id: string) =>
    setActivePages((pages) => pages.filter((page) => page !== id));
  const handleSelectPage = (id: string) => setCurrentPage(id);
  const handleBackPage = () => {};
  const handleForwardPage = () => {};
  const disabledBackPage = false;
  const disabledForwardPage = false;

  return {
    handleDeletePage,
    handleSelectPage,
    currentPage,
    handleBackPage,
    handleForwardPage,
    disabledBackPage,
    disabledForwardPage,
    activePages,
  };
};

const useWindowScroll = () => {
  const [scroll, setScroll] = useState({ y: 0 });
  useEffect(() => {
    const handleScroll = () => setScroll({ y: window.scrollY });
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return [scroll];
};

export const NavigationBar = () => {
  const { loggedIn } = useAuthContext();
  const {
    handleDeletePage,
    handleSelectPage,
    currentPage,
    handleBackPage,
    handleForwardPage,
    disabledBackPage,
    disabledForwardPage,
    activePages,
  } = usePagesContext();
  const [window] = useWindowScroll();

  const computedPages = useMemo(() => {
    return (
      DUMMY_PAGES.filter((page) => page.properties.title).map((page) => {
        const title = page.properties.title.title[0]?.plain_text;
        const id = page.id;
        return { title, id };
      }) ?? []
    );
  }, []);

  const [shortPages, longPages] = useMemo(() => {
    let shortPages: PageType[] = [];
    let longPages: PageType[] = [];

    const currentPageIndex = computedPages.findIndex(
      (page) => page.id === currentPage
    );

    const lastActivePages = computedPages.filter(
      (page) => activePages.includes(page.id) && page.id !== currentPage
    );

    shortPages = [
      ...(activePages.length > 0
        ? lastActivePages.slice(lastActivePages.length - 2)
        : []),
      ...(currentPageIndex !== -1 ? [computedPages[currentPageIndex]] : []),
    ];

    longPages = computedPages.filter((page) => !shortPages.includes(page));

    return [shortPages, longPages];
  }, [computedPages, currentPage, activePages]);

  const filteredPages = useMemo(() => {
    return activePages
      .filter((page) => !shortPages.some((p) => p.id === page))
      .map((page) => longPages.find((p) => p.id === page))
      .filter((page) => page !== undefined);
  }, [activePages, longPages, shortPages]);

  const isScrolled = useMemo(() => (window?.y as number) > 10, [window]);

  const classes = useMemo(
    () => ({
      container: cn(
        "sticky top-0 z-50",
        isScrolled &&
          "bg-LightBackground/40 backdrop-blur dark:bg-DarkBackground border-b"
      ),
    }),
    [isScrolled]
  );

  return (
    <div
      className={cn(
        "flex flex-wrap justify-between items-center border-zinc-100 dark:border-zinc-900 p-3 border-b w-full",
        classes.container
      )}
    >
      <div className="flex gap-x-1">
        <Tooltip content="Previous page">
          <ChevronLeft
            className={cn("cursor-pointer w-4 h-4 text-zinc-500", {
              "opacity-50": disabledForwardPage,
            })}
            onClick={handleForwardPage}
          />
        </Tooltip>
        <Tooltip content="Next page">
          <ChevronRight
            className={cn("cursor-pointer w-4 h-4 text-zinc-500", {
              "opacity-50": disabledBackPage,
            })}
            onClick={handleBackPage}
          />
        </Tooltip>
      </div>
      <div className="flex gap-x-1 overflow-x-auto overflow-y-hidden">
        {shortPages?.map((page) => (
          <Tooltip
            key={page.id}
            content={page.title}
            size="sm"
            radius="sm"
            color="default"
          >
            <Chip
              className="cursor-pointer select-none"
              key={page.id}
              // color={page.id === currentPage ? 'primary' : 'default'}
              color={page.id === currentPage ? "primary" : "default"}
              radius="sm"
              variant="flat"
              size="sm"
              onClick={() => handleSelectPage(page.id)}
              onClose={() => handleDeletePage(page.id)}
              onMouseDown={(e) => {
                e.stopPropagation();

                if (e.button === 1) {
                  handleDeletePage(page.id);
                }
              }}
            >
              {addEllipsisIfSplittable(page.title)}
            </Chip>
          </Tooltip>
        ))}
        {activePages.length > 3 && (
          <Dropdown>
            <DropdownTrigger>
              <Chip
                size="sm"
                variant="flat"
                radius="sm"
                className="cursor-pointer"
              >
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </Chip>
            </DropdownTrigger>
            <DropdownMenu>
              {filteredPages?.map((page) => (
                <DropdownItem
                  key={page?.id}
                  onClick={() => handleSelectPage(page.id)}
                  onSelect={() => handleSelectPage(page.id)}
                >
                  {page?.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <div className="flex gap-x-2 items-center">
        <RefreshPages />
        <NewPageButton />
        {/* <UserProfile /> */}
      </div>
    </div>
  );
};

const RefreshPages = () => {
  const { loggedIn } = useAuthContext();
  const { currentPage } = usePagesContext();
  const [isFetching, setIsFetching] = useState(false);

  const handleRefresh = () => {
    setIsFetching(true);
    setTimeout(() => setIsFetching(false), 1000); // Simulate API call
  };

  return (
    <Tooltip content={isFetching ? "Refreshing..." : "Refresh"}>
      <Chip
        color="default"
        radius="sm"
        variant="flat"
        size="sm"
        className="cursor-pointer"
        onClick={handleRefresh}
      >
        <RefreshCw
          className={cn("w-4 h-4 text-zinc-500", {
            "animate-spin": isFetching,
          })}
        />
      </Chip>
    </Tooltip>
  );
};

const NewPageButton = () => {
  const { handleNewPage } = usePagesContext();

  const computedPages = useMemo(() => {
    return DUMMY_PAGES.filter((page) => page?.properties?.title).map((page) => {
      const title = page?.properties?.title?.title[0]?.plain_text;
      const id = page.id;
      return { title, id };
    }) as PageType[];
  }, []);

  return (
    <Dropdown
      classNames={{
        base: "max-h-[400px] overflow-y-auto",
        content: "radius-lg",
      }}
    >
      <DropdownTrigger>
        <Chip
          color="default"
          radius="sm"
          variant="flat"
          size="sm"
          className="cursor-pointer"
        >
          <Tooltip content="New page">
            <Plus className="w-4 h-4 text-zinc-500" />
          </Tooltip>
        </Chip>
      </DropdownTrigger>
      <DropdownMenu>
        {computedPages?.map((page) => (
          <DropdownItem
            key={page.id}
            className="text-xs"
            onSelect={() => handleNewPage(page.id)}
            onClick={() => handleNewPage(page.id)}
          >
            {page.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
