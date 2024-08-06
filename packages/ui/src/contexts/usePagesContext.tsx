import { createContext, useContext, useState, ReactNode } from "react";

interface Page {
  id: string;
  title: string;
}

interface Block {
  id: string;
  pageId: string;
  text: string;
  completed: boolean;
}

interface PagesContextProps {
  handleDeletePage: (id: string) => void;
  handleSelectPage: (id: string) => void;
  currentPage: string;
  handleBackPage: () => void;
  handleForwardPage: () => void;
  disabledBackPage: boolean;
  disabledForwardPage: boolean;
  activePages: string[];
  handleNewPage: (title: string) => void;
  pages: Page[];
  blocks: Block[];
  handleUpdateBlock: (blockId: string, checked?: boolean, content?: string) => void;
  handleDeleteBlock: (blockId: string) => void;
  handleNewBlock: (text: string) => void;
}

const PagesContext = createContext<PagesContextProps | undefined>(undefined);

const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [activePages, setActivePages] = useState<string[]>(["1", "2", "3", "4"]);
  const [pages, setPages] = useState<Page[]>([
    { id: "1", title: "Home" },
    { id: "2", title: "Work" },
    { id: "3", title: "Personal" },
    { id: "4", title: "Shopping List" },
  ]);

  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", pageId: "1", text: "Welcome to your homepage! This is the place where you can start organizing your tasks.", completed: true },
    { id: "2", pageId: "1", text: "You can add new tasks using the input field below. Just type your task and hit Enter or click the Plus icon.", completed: false },
    { id: "3", pageId: "1", text: "Tasks can be marked as complete by clicking the checkbox next to them.", completed: false },
    { id: "4", pageId: "1", text: "You can delete tasks by clicking the trash icon next to them.", completed: false },
    { id: "5", pageId: "2", text: "Finish the project report", completed: true },
    { id: "6", pageId: "2", text: "Send the project update email", completed: false },
    { id: "7", pageId: "3", text: "Buy birthday gift", completed: false },
    { id: "8", pageId: "3", text: "Call mom", completed: true },
    { id: "9", pageId: "4", text: "Buy milk", completed: false },
    { id: "10", pageId: "4", text: "Buy bread", completed: false },
    { id: "11", pageId: "4", text: "Buy eggs", completed: true },
  ]);

  const handleDeletePage = (id: string) => {
    setActivePages((pages) => pages.filter((page) => page !== id));
    setPages((prevPages) => prevPages.filter((page) => page.id !== id));
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.pageId !== id));
  };

  const handleSelectPage = (id: string) => setCurrentPage(id);

  const handleBackPage = () => {
    const currentIndex = activePages.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(activePages[currentIndex - 1]);
    }
  };

  const handleForwardPage = () => {
    const currentIndex = activePages.indexOf(currentPage);
    if (currentIndex < activePages.length - 1) {
      setCurrentPage(activePages[currentIndex + 1]);
    }
  };

  const disabledBackPage = activePages.indexOf(currentPage) <= 0;
  const disabledForwardPage = activePages.indexOf(currentPage) >= activePages.length - 1;

  const handleNewPage = (title: string) => {
    const newPage: Page = { id: (pages.length + 1).toString(), title };
    setPages((prevPages) => [...prevPages, newPage]);
    setActivePages((prevActivePages) => [...prevActivePages, newPage.id]);
  };

  const handleUpdateBlock = (blockId: string, checked?: boolean, content?: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              completed: checked !== undefined ? checked : block.completed,
              text: content !== undefined ? content : block.text,
            }
          : block
      )
    );
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== blockId));
  };

  const handleNewBlock = (text: string) => {
    const newBlock: Block = {
      id: (blocks.length + 1).toString(),
      pageId: currentPage,
      text,
      completed: false,
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  return (
    <PagesContext.Provider
      value={{
        handleDeletePage,
        handleSelectPage,
        currentPage,
        handleBackPage,
        handleForwardPage,
        disabledBackPage,
        disabledForwardPage,
        activePages,
        handleNewPage,
        pages,
        blocks,
        handleUpdateBlock,
        handleDeleteBlock,
        handleNewBlock,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

const usePagesContext = () => {
  const context = useContext(PagesContext);
  if (context === undefined) {
    throw new Error("usePagesContext must be used within a PagesProvider");
  }
  return context;
};

export { PagesProvider, usePagesContext };