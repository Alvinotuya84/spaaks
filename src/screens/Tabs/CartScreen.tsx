import {View, Text} from 'react-native';
import React from 'react';
import Page from '@/src/components/reusables/Page';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/src/app/store';
import Box, {AnimateOnAppear, ShadowBox} from '@/src/components/reusables/Box';
import ThemedButton from '@/src/components/reusables/ThemedButton';
import ThemedText from '@/src/components/reusables/ThemedText';
import {useTheme} from '@/src/hooks/useTheme.hook';
import ImageWrapper from '@/src/components/reusables/ImageWrapper';
import {
  addItemToCart,
  removeItemFromCart,
} from '@/src/app/features/theme/cartSlice';
import {useToast} from '@/src/components/toast-manager';

type Props = {};

const CartScreen = (props: Props) => {
  const theme = useTheme();
  const {items, totalAmount} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const {showToast} = useToast();
  return (
    <Page
      header={{
        title: 'My Cart',
      }}>
      {items.length <= 0 ? (
        <Box justify="center" flex={1} align="center">
          <LottieView
            autoPlay
            style={{
              width: 200,
              height: 200,
            }}
            source={require('@/assets/cart/empty-cart.json')}
          />
          <ThemedText color={theme.primary} size={'xxl'} weight="bold">
            Empty Cart
          </ThemedText>
        </Box>
      ) : (
        <Box direction="column" px={20} py={20} gap={20} style={{flex: 1}}>
          <AnimateOnAppear visible={true} animation="fadeInUp">
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              Shopping Cart
            </Text>
          </AnimateOnAppear>

          <AnimateOnAppear visible={true} animation="fadeInUp" duration={100}>
            <Box direction="column" gap={10}>
              {items.map(item => (
                <Box
                  overflow="hidden"
                  key={item.id}
                  direction="row"
                  justify="space-between"
                  pa={10}
                  radius={10}
                  color={theme.surface}>
                  <ImageWrapper
                    height={50}
                    width={50}
                    source={{uri: item.image}}
                  />
                  <Box align="center">
                    <ThemedText size={'xxs'}>{item.title}</ThemedText>
                    <ThemedText weight="bold">${item.price}</ThemedText>

                    <Box direction="row" gap={2} align="center">
                      <ThemedButton
                        type="text"
                        size="xxxs"
                        onPress={() => {
                          dispatch(removeItemFromCart(item.id));
                          showToast({
                            title: `${item.title} removed from cart`,
                            type: 'success',
                          });
                        }}
                        icon={{
                          name: 'minus',
                          source: 'FontAwesome',
                          size: 20,
                          gap: 2,
                        }}
                      />

                      <ThemedText>{item.quantity}</ThemedText>
                      <ThemedButton
                        type="text"
                        size="xxxs"
                        onPress={() => {
                          dispatch(addItemToCart(item));
                          showToast({
                            title: `${item.title} added to cart`,
                            type: 'success',
                          });
                        }}
                        icon={{
                          name: 'plus',
                          source: 'FontAwesome',
                          size: 20,
                          gap: 2,
                        }}
                      />
                    </Box>
                  </Box>
                  <ThemedButton
                    height={50}
                    onPress={() => {
                      dispatch(removeItemFromCart(item.id));
                      showToast({
                        title: `${item.title} removed from cart`,
                        type: 'success',
                      });
                    }}
                    color={theme.danger}
                    icon={{
                      name: 'trash',
                      source: 'FontAwesome',
                      size: 20,
                      gap: 2,
                    }}
                  />
                </Box>
              ))}
            </Box>
          </AnimateOnAppear>

          <AnimateOnAppear visible={true} animation="fadeInUp" duration={200}>
            <Box
              direction="row"
              color={theme.surface}
              justify="space-between"
              pa={10}
              radius={10}>
              <ThemedText style={{fontSize: 18, fontWeight: 'bold'}}>
                Total
              </ThemedText>
              <ThemedText style={{fontSize: 18, fontWeight: 'bold'}}>
                ${totalAmount.toFixed(2)}
              </ThemedText>
            </Box>
          </AnimateOnAppear>

          <ThemedButton label={'Checkout'} />
        </Box>
      )}
    </Page>
  );
};

export default CartScreen;
