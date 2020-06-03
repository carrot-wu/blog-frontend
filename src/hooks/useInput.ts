import {useState} from "react";

export default function useInput<T>(defaultValue: T | (() => T)) {
  const [value ,setValue] = useState<T>(defaultValue)
}
