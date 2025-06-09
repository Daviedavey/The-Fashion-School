import { createStackNavigator } from '@react-navigation/stack';
import DashBoardScreen from '../screens/DashBoardScreen';
import AssignmentsScreen from '../screens/AssignmentsScreen';
import AgendaScreen from '../screens/AgendaScreen';
import BlogScreen from '../screens/BlogScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import PortfolioScreen from '../screens/PortfolioScreen';

// navigation/StudentStack.js
const Stack = createStackNavigator();
export default function StudentStack() {
  return (
    <Stack.Navigator>
     <Stack.Screen name="DashBoard" component={DashBoardScreen} />
     <Stack.Screen name="Assignments" component={AssignmentsScreen} />
     <Stack.Screen name="Agenda" component={AgendaScreen} />
     <Stack.Screen name="Blog" component={BlogScreen} />
     <Stack.Screen name="Favourites" component={FavouritesScreen} />
     <Stack.Screen name="Portfolio" component={PortfolioScreen} />
    </Stack.Navigator>
  );
}