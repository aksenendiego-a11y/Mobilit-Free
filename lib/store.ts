import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Types
interface UserProfile {
  id: string;
  name: string;
  level: string;
  frequency: string;
  schedule: string;
  location: string;
  equipment: string[];
  injuries: string[];
  language: string;
  units: string;
  economyMode: boolean;
  streakVisible: boolean;
}

interface TestResult {
  id: string;
  testDate: number;
  overallScore: number;
  zoneScores: Record<string, number>;
}

interface ExerciseProgress {
  exerciseId: string;
  sessionStarted: boolean;
  completed: boolean;
  skipped: boolean;
}

interface CurrentSession {
  id: string;
  exerciseId: string;
  exercises: Exercise[];
  isActive: boolean;
}

interface Exercise {
  id: string;
  name: string;
  slug: string;
  zone: string;
  type: string;
  equipment: string;
  difficulty: number;
  duration_minutes: number;
  instructions: string;
  stimulus: string;
  common_errors: string;
  progression: string;
  regression: string;
  contraindications: string;
  review_status: string;
  video_url: string;
  thumbnail_url: string;
}

interface StoreState {
  user: UserProfile | null;
  testResults: TestResult[];
  dailyRoutine: Exercise[];
  exerciseProgress: ExerciseProgress[];
  currentSession: CurrentSession | null;
  streakCount: number;
  streakVisible: boolean;
  economyMode: boolean;
  language: string;
  units: string;
  lesions: string[];
  equipment: string[];
  loading: boolean;
}

// Initial state
const initialState: StoreState = {
  user: null,
  testResults: [],
  dailyRoutine: [],
  exerciseProgress: [],
  currentSession: null,
  streakCount: 0,
  streakVisible: true,
  economyMode: false,
  language: 'pt-BR',
  units: 'kg',
  lesions: [],
  equipment: [],
  loading: false,
};

// Slices
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    toggleEconomyMode: (state) => {
      state.economyMode = !state.economyMode;
      if (state.user) state.user.economyMode = state.economyMode;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      if (state.user) state.user.language = action.payload;
    },
    setUnits: (state, action: PayloadAction<string>) => {
      state.units = action.payload;
      if (state.user) state.user.units = action.payload;
    },
    addLesion: (state, action: PayloadAction<string>) => {
      state.lesions.push(action.payload);
    },
    removeLesion: (state, action: PayloadAction<string>) => {
      state.lesions = state.lesions.filter(l => l !== action.payload);
    },
    addEquipment: (state, action: PayloadAction<string>) => {
      state.equipment.push(action.payload);
    },
    removeEquipment: (state, action: PayloadAction<string>) => {
      state.equipment = state.equipment.filter(e => e !== action.payload);
    },
  },
});

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    addTestResult: (state, action: PayloadAction<TestResult>) => {
      state.testResults.push(action.payload);
    },
    setTestResults: (state, action: PayloadAction<TestResult[]>) => {
      state.testResults = action.payload;
    },
  },
});

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    setDailyRoutine: (state, action: PayloadAction<Exercise[]>) => {
      state.dailyRoutine = action.payload;
    },
  },
});

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<CurrentSession>) => {
      state.currentSession = action.payload;
    },
    endSession: (state) => {
      state.currentSession = null;
    },
    completeExercise: (state, action: PayloadAction<string>) => {
      const progress = state.exerciseProgress.find(p => p.exerciseId === action.payload);
      if (progress) progress.completed = true;
    },
    skipExercise: (state, action: PayloadAction<string>) => {
      const progress = state.exerciseProgress.find(p => p.exerciseId === action.payload);
      if (progress) progress.skipped = true;
    },
    startExerciseProgress: (state, action: PayloadAction<string>) => {
      state.exerciseProgress.push({
        exerciseId: action.payload,
        sessionStarted: true,
        completed: false,
        skipped: false,
      });
    },
  },
});

const streakSlice = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    setStreakCount: (state, action: PayloadAction<number>) => {
      state.streakCount = action.payload;
    },
    toggleStreakVisibility: (state) => {
      state.streakVisible = !state.streakVisible;
    },
  },
});

// Root reducer
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  test: testSlice.reducer,
  routine: routineSlice.reducer,
  session: sessionSlice.reducer,
  streak: streakSlice.reducer,
});

// Store
export const store = configureStore({
  reducer: rootReducer,
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Action exports
export const {
  setUser,
  updateProfile,
  toggleEconomyMode,
  setLanguage,
  setUnits,
  addLesion,
  removeLesion,
  addEquipment,
  removeEquipment,
} = userSlice.actions;

export const {
  addTestResult,
  setTestResults,
} = testSlice.actions;

export const {
  setDailyRoutine,
} = routineSlice.actions;

export const {
  startSession,
  endSession,
  completeExercise,
  skipExercise,
  startExerciseProgress,
} = sessionSlice.actions;

export const {
  setStreakCount,
  toggleStreakVisibility,
} = streakSlice.actions;

// Selectors
export const selectUserProfile = (state: RootState) => state.user;
export const selectTestResults = (state: RootState) => state.test.testResults;
export const selectDailyRoutine = (state: RootState) => state.routine.dailyRoutine;
export const selectExerciseProgress = (state: RootState) => state.session.exerciseProgress;
export const selectCurrentSession = (state: RootState) => state.session.currentSession;
export const selectMembership = (state: RootState) => state.user;
export const selectDailyStreak = (state: RootState) => ({
  count: state.streak.streakCount,
  isVisible: state.streak.streakVisible,
});