import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import React from 'react';
import { BsBank } from 'react-icons/bs';

export default function Ali() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen} bg={'#03559c'} color={'#fff'} colorScheme="none">
        + Tambah No. Rekening
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Form method="post">
            <Input type="hidden" name="actionType" value="create" />
            <ModalHeader display={'flex'} alignItems={'center'}>
              <BsBank /> <Text ml={'5px'}>Informasi Bank </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Bank</FormLabel>
                <Accordion allowToggle>
                  <AccordionItem borderRadius={'10px'} width={'100%'}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Pilih Rekening Bank untuk menerima penarikan
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={'gray.600'}>
                        BRI
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={'gray.600'}>
                        BCA
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={'gray.600'}>
                        MANDIRI
                      </Button>
                    </AccordionPanel>
                    <AccordionPanel pb={0}>
                      <Button colorScheme="none" color={'gray.600'} name="BNI">
                        BNI
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Nama Bank</FormLabel>
                <Input
                  type="text"
                  ref={initialRef}
                  placeholder="Nama Pemilik Rekening"
                  name="bankName"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Atas Nama</FormLabel>
                <Input
                  type="text"
                  ref={initialRef}
                  placeholder="Nama Pemilik Rekening"
                  name="name"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Nomor Rekening</FormLabel>
                <Input type="text" placeholder="123456789" name="bankNumber" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
                Tambah Akun Bank
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
