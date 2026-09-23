#!/usr/bin/env python3

import argparse
import sys

class Formatter(argparse.ArgumentDefaultsHelpFormatter, argparse.RawDescriptionHelpFormatter):
    pass

EXAMPLE_USAGE = '''examples:
    run --at-driver-host http://localhost:3131 test1.html
    run --at-driver-host http://localhost:3131 test1.html test2.html
'''

def main(browser, webdriver_bin, at_driver_host, tests):
    # TODO: implement test-running
    # 1. start webdriver
    # 2. create session
    # 3. for each test:
    #    1. navigate to test
    #    2. collect results
    # 4. close webdriver
    # 5. report results

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description=main.__doc__,
        formatter_class=Formatter,
        epilog=EXAMPLE_USAGE
    )
    parser.add_argument(
        '--browser',
        help='the name of the web browser to use',
        choices=['firefox', 'chrome', 'safari'],
        default='firefox'
    )
    parser.add_argument(
        '--webdriver-bin',
        help='filesystem path to the WebDriver server executable to use',
        default='geckodriver'
    )
    parser.add_argument(
        '--at-driver-host',
        help='''
            the URL at which the AT Driver server under test is listening
        ''',
        required=True,
        type=str,
    )
    parser.add_argument(
        'tests',
        help='''
            the tests to run
        ''',
        nargs='+'
    )

    sys.exit(main(**vars(parser.parse_args())))
