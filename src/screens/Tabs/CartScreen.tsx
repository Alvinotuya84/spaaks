import {View, Text} from 'react-native';
import React from 'react';
import Page from '@/src/components/reusables/Page';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/src/app/store';
import Box, {AnimateOnAppear, ShadowBox} from '@/src/components/reusables/Box';
import ThemedButton from '@/src/components/reusables/ThemedButton';
import ThemedText from '@/src/components/reusables/ThemedText';
import {useTheme} from '@/src/hooks/useTheme.hook';

type Props = {};

const CartScreen = (props: Props) => {
  const theme = useTheme();
  const {items, totalAmount} = useSelector((state: RootState) => state.cart);
  return (
    <Page
      header={{
        title: 'My Cart',
      }}>
      {totalAmount === 0 ? (
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
        <Box
          direction="column"
          px={20}
          py={20}
          gap={20}
          color="#f8f8f8"
          style={{flex: 1}}>
          <AnimateOnAppear visible={true} animation="fadeInUp">
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              Shopping Cart
            </Text>
          </AnimateOnAppear>

          <AnimateOnAppear visible={true} animation="fadeInUp" duration={100}>
            <Box direction="column" gap={10}>
              {items.map(item => (
                <ShadowBox
                  key={item.id}
                  direction="row"
                  justify="space-between"
                  pa={10}
                  radius={10}
                  color="#fff">
                  <ThemedText>{item.title}</ThemedText>
                  <ThemedText>${item.price}</ThemedText>
                </ShadowBox>
              ))}
            </Box>
          </AnimateOnAppear>

          <AnimateOnAppear visible={true} animation="fadeInUp" duration={200}>
            <Box
              direction="row"
              justify="space-between"
              pa={10}
              radius={10}
              color="#fff">
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Total</Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                ${totalAmount}
              </Text>
            </Box>
          </AnimateOnAppear>

          <ThemedButton label={'Checkout'} />
        </Box>
      )}
    </Page>
  );
};

export default CartScreen;
