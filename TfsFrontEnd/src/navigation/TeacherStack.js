// navigation/TeacherStack.js
import { createStackNavigator } from '@react-navigation/stack';
import TeacherDashBoardScreen from '../screens/TeacherDashBoardScreen';
import UploadAssignmentsScreen from '../screens/UploadAssignmentsScreen';
import UpdateBlogScreen from '../screens/UpdateBlogScreen';
import ViewPortfolioScreen from '../screens/ViewPortfolioScreen';

const Stack = createStackNavigator();

export default function TeacherStack() {
  return (
     <Stack.Navigator>
      <Stack.Screen name="TeacherDashBoard" component={TeacherDashBoardScreen} />
      <Stack.Screen name="UploadAssignments" component={UploadAssignmentsScreen} />
      <Stack.Screen name="UpdateBlog" component={UpdateBlogScreen} />
      <Stack.Screen name="ViewPortfolio" component={ViewPortfolioScreen} />
    </Stack.Navigator>
  );
}