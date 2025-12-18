import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UIState {
  activeSection: string;
  isMenuOpen: boolean;
  isScrolled: boolean;
}

const initialState: UIState = {
  activeSection: 'home',
  isMenuOpen: false,
  isScrolled: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    setScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
  },
});

export const { setActiveSection, toggleMenu, closeMenu, setScrolled } = uiSlice.actions;
export const selectActiveSection = (state: RootState) => state.ui.activeSection;
export const selectIsMenuOpen = (state: RootState) => state.ui.isMenuOpen;
export const selectIsScrolled = (state: RootState) => state.ui.isScrolled;
export default uiSlice.reducer;
