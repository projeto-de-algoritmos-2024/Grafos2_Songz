"use client";

import GraphComponent from "@/components/graph-component";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGraph } from "@/hooks";
import { mockData } from "@/lib/mocks/songs";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { relatedNodes, findRelatedNodes, matchingNodes } = useGraph();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setAutocompleteOptions([]);
    if (searchInputRef.current && searchInputRef.current.value.trim() !== "") {
      findRelatedNodes(searchInputRef.current.value);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.trim() === "") {
      setAutocompleteOptions([]);
    } else {
      const filteredOptions = mockData.nodes
        .filter((node) => node.id.toLowerCase().includes(value.toLowerCase()))
        .map((node) => node.id);
      setAutocompleteOptions(filteredOptions);
    }
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setAutocompleteOptions([]);
    if (searchInputRef.current) {
      searchInputRef.current.value = option;
    }
    findRelatedNodes(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setAutocompleteOptions([]);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <main className="min-h-svh w-[100vw] overflow-x-hidden">
      <div className="flex container min-h-20 items-center justify-between">
        <h1 className="text-4xl font-bold">SONGZ</h1>
        <form
          onSubmit={handleSearch}
          ref={formRef}
          className="flex gap-2 relative"
        >
          <Input
            className="w-96"
            ref={searchInputRef}
            placeholder="Digite o nome da música"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button variant="default" type="submit">
            Buscar
          </Button>
          {autocompleteOptions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-card border border-gray-300 z-10 max-h-[70vh] overflow-auto">
              {autocompleteOptions.map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-900 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </form>
        <ModeToggle />
      </div>
      {relatedNodes.length === 0 || matchingNodes.length === 0 ? (
        <div className="text-center">Nenhuma música encontrada</div>
      ) : (
        <div className="flex w-full container mt-10">
          <div className="flex flex-col w-1/3 gap-10">
            <h2 className="text-3xl font-bold">Resultado da pesquisa</h2>
            <ul>
              {matchingNodes.map((node) => (
                <li key={node.id}>{node.id}</li>
              ))}
            </ul>
            <h2 className="text-3xl font-bold">Recomendações</h2>
            <ul>
              {relatedNodes.map((node) => (
                <li key={node}>{node}</li>
              ))}
            </ul>
          </div>
          <div className="w-2/3">
            <GraphComponent />
          </div>
        </div>
      )}
    </main>
  );
}
